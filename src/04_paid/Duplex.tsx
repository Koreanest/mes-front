import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../include/footer/Footer";
import QuitHeader from "../include/header/QuitHeader";
import api from "../api/client";
import "./DuplexSkeleton.scss";

// ===== 타입 정의 =====
type UserEntity = {
  id: number;
  email: string;
  provider: string;
  providerId: string | null;
  di: string | null;
  ci: string | null;
  realName: string | null;
  phone: string | null;
  birthDate: string | null;
  gender: string | null;
  identityVerified: boolean;
  deleted: boolean;
};

type UserProfile = {
  createDate: string;
  updateDate: string;
  id: number;
  user: UserEntity;
  name: string;
  gender: "MALE" | "FEMALE" | null;
  birthDate: string;      // "1982-01-24"
  birthTime: string;      // "12:00:00"
  birthTimeUnknown: boolean;
};

type ProfileResponse = {
  profile: UserProfile | null;
  email: string;
};

type ProductDetail = {
  id: number;
  sortOrder: number;
  categoryType: string;   // "saju" | "tarot" 등
  question: string;
  detailGuide: string;
  exampleQuestion: string | null;
  exampleAnswer: string | null;
};

type SajuGptResponse = {
  historyId: number | null;
  message: string;
};


const Duplex = () => {
  const [loading, setLoading] = useState(true); // 스켈레톤 표시 여부
  const [progress, setProgress] = useState(0);  // 진행률 (%)

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  const [sajuResult, setSajuResult] = useState<any | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  // ===== 프로그레스 증가 유틸 (최대 80%) =====
  const increaseProgress = () => {
    setProgress((prev) => Math.min(prev + 20, 80));
  };

  // ===== 생일 파라미터 만들기 (YYYYMMDDHHmm) =====
  const buildBirthdayParam = (p: UserProfile | null): string | null => {
    if (!p || !p.birthDate) return null;

    const datePart = p.birthDate.replace(/-/g, ""); // "1982-01-24" -> "19820124"

    // birthTimeUnknown 이거나 값이 이상하면 0000
    let timePart = "0000";
    if (!p.birthTimeUnknown && p.birthTime) {
      const [hh, mm] = p.birthTime.split(":"); // "12:00:00" -> "12", "00"
      const hhSafe = hh?.padStart(2, "0") ?? "00";
      const mmSafe = mm?.padStart(2, "0") ?? "00";
      timePart = `${hhSafe}${mmSafe}`;
    }

    return `${datePart}${timePart}`; // ex) 198201241200
  };

  // ===== 오늘 날짜 yyyymmdd =====
  const buildTodayParam = () => {
    const now = new Date();
    const yyyy = now.getFullYear().toString();
    const mm = (now.getMonth() + 1).toString().padStart(2, "0");
    const dd = now.getDate().toString().padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
  };

  // ===== GPT 백엔드로 전송 =====
  const sendToBackend = async (
    p: UserProfile,
    details: ProductDetail[],
    saju: any
  ) => {
    try {
      const res = await api.post<SajuGptResponse>("/api/fortune/saju-gpt", {
        productId: productId ? Number(productId) : null,
        profile: {
          name: p.name,
          gender: p.gender,
          birthDate: p.birthDate,
          birthTime: p.birthTime,
          birthTimeUnknown: p.birthTimeUnknown,
        },
        productDetails: details,
        sajuResult: saju,
      });

      const { historyId } = res.data;

      navigate(`/text?historyId=${historyId}&productId=${productId}`);

      // GPT까지 끝나면 100%
      setProgress(100);

      // TODO: 백엔드 응답에 따라 결과 페이지로 이동할 때 여기서 navigate 추가
      // navigate(`/result?productId=${productId}`);
    } catch (e) {
      console.error("사주 GPT 백엔드 전송 실패", e);
      // 실패해도 진행바는 80% 근처에서 멈추게 둘 수도 있고,
      // 필요하면 setProgress(100) 대신 90 같은 값으로 조정 가능
    }
  };

  // ===== 초기 로딩: API들 호출 + 스켈레톤 타이머 =====
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);

    const fetchAll = async () => {
      try {
        // 1) 프로필 조회
        const profileRes = await api.get<ProfileResponse>("/api/profile");
        const p = profileRes.data.profile ?? null;
        setProfile(p);
        increaseProgress();

        // 2) 상품 디테일 조회 (productId 가 있을 때만)
        let details: ProductDetail[] = [];
        if (productId) {
          const detailRes = await api.get<ProductDetail[]>(
            `/api/products/${productId}/details`
          );
          details = detailRes.data || [];
          setProductDetails(details);
          increaseProgress();
        }

        // 3) 사주 API 호출
        if (p) {
          const birthdayParam = buildBirthdayParam(p);
          if (birthdayParam) {
            const sexParam = p.gender === "FEMALE" ? "female" : "male";
            const todayParam = buildTodayParam();

            const query = new URLSearchParams({
              birthday: birthdayParam,
              lunar: "false",
              sex: sexParam,
              today: todayParam,
            });

            const sajuRes = await fetch(
              `https://service.stargio.co.kr:8400/StargioSaju?${query.toString()}`
            );

            if (sajuRes.ok) {
              const sajuJson = await sajuRes.json();
              setSajuResult(sajuJson);
              increaseProgress();

              // 4) GPT 백엔드로 최종 전송
              await sendToBackend(p, details, sajuJson);
            } else {
              console.error("사주 API 실패", sajuRes.status);
            }
          }
        }
      } catch (e) {
        console.error("Duplex 초기 API 호출 실패", e);
      }
    };

    fetchAll();

    return () => clearTimeout(timer);
  }, [productId]); // productId 변경 시 다시 실행

  // ===== 스켈레톤 =====
  if (loading) {
    return (
      <div className="Min390Max">
        {/* Header */}
        <div className="skeleton-header"></div>

        {/* 메인 이미지 */}
        <div className="mt-80 dup-wrap p-0">
          <div className="skeleton-img-large"></div>
        </div>

        {/* 진행 안내 텍스트 */}
        <div className="dup-time">
          <div className="skeleton-title short"></div>
          <div className="skeleton-title shorter mt-2"></div>

          {/* 진행바 */}
          <div className="dup-time-progress d-flex align-items-center justify-content-between">
            <div className="w-75">
              <div className="progress">
                <div className="progress-bar skeleton-progress"></div>
              </div>
            </div>
            <div className="num skeleton-text-short"></div>
          </div>
        </div>

        {/* 무료 운세 보기 카드 */}
        <div className="wait-wrap">
          <div className="skeleton-title short mb-3"></div>
          <div className="wait-wrap-over d-flex justify-content-between">
            <div className="wait">
              <div className="skeleton-img-small"></div>
              <div className="skeleton-title short mt-2"></div>
              <div className="skeleton-title shorter mt-1"></div>
            </div>
            <div className="wait">
              <div className="skeleton-img-small"></div>
              <div className="skeleton-title short mt-2"></div>
              <div className="skeleton-title shorter mt-1"></div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="double-btn-wrap d-flex justify-content-between mt-4">
          <div className="w-50">
            <div className="skeleton-btn"></div>
          </div>
          <div className="mx-1"></div>
          <div className="w-50">
            <div className="skeleton-btn"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }

  // ===== 실제 화면 =====
  return (
    <>
    <QuitHeader />
      <div className="Min390Max">
        
        <div className="dup-wrap p-0">
          <img src="/svg/paid/study.png" alt="" />
        </div>
        <div className="dup-time">
          <h5>정확한 해석을 위해 시간이 필요해요</h5>
          <h4>
            결과가 나오면 <span>알림톡을 보내드릴께요</span>
          </h4>
          <div className="dup-time-progress d-flex align-items-center justify-content-between">
            <div className="w-75">
              <div className="progress">
                <div
                  className="progress-bar bg-main"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="num">{progress}%</div>
          </div>
        </div>

        <div className="wait-wrap">
          <h5>기다리는 동안 무료 운세 보기</h5>
        <div className="wait-wrap-over">
            
            <div className="wait">
              <img src="/svg/paid/small.png" alt="" />
              <h5>무료체험판</h5>
              <h4>혹시 지금 바람 피우고 있을까?</h4>
            </div>

            <div className="wait">
              <img src="/svg/paid/small.png" alt="" />
              <h5>무료체험판</h5>
              <h4>혹시 지금 바람 피우고 있을까?</h4>
            </div>

            <div className="wait">
              <img src="/svg/paid/small.png" alt="" />
              <h5>무료체험판</h5>
              <h4>혹시 지금 바람 피우고 있을까?</h4>
            </div>

            <div className="wait">
              <img src="/svg/paid/small.png" alt="" />
              <h5>무료체험판</h5>
              <h4>혹시 지금 바람 피우고 있을까?</h4>
            </div>
          </div>
          {/* TODO: 나중에 productDetails / sajuResult 기반으로 추천 카드 뿌리기*/} 
          
        </div>

        <div className="double-btn-wrap d-flex justify-content-between">
          <div className="w-50">
            <a className="basicMintGray" href="/">
              홈으로 가기
            </a>
          </div>
          <div className="mx-1"></div>
          <div className="w-50">
            <a
              className="basicMint"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              다른 운세 보기
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Duplex;
/*

*/