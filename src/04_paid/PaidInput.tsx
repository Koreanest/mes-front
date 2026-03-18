import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../include/footer/Footer";
import NomalHeader from "../include/header/NomalHeader";
import api from "../api/client";
import "./PaidInputSkeleton.scss";

// 백엔드 응답 타입 참고용
type Profile = {
  id: number;
  name: string | null;
  gender: "FEMALE" | "MALE" | null;
  birthDate: string | null;        // LocalDate → "YYYY-MM-DD"
  birthTime: string | null;        // LocalTime → "HH:MM:SS" 형태일 가능성
  birthTimeUnknown: boolean;
};

type ProfileResponse = {
  email: string;
  profile: Profile | null;
};

const PaidInput = () => {
  // /paid-input/:productId?  에서 productId(옵션) 받기
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId"); 

  const [loading, setLoading] = useState(true);       // 스켈레톤용
  const [saving, setSaving] = useState(false);        // 저장 버튼 로딩

  // 폼 상태
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeUnknown, setBirthTimeUnknown] = useState(false);

  // ===== 초기 로딩: 스켈레톤 + 프로필 불러오기 =====
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);

    const fetchProfile = async () => {
      try {
        const res = await api.get<ProfileResponse>("/api/profile");
        const profile = res.data.profile;

        if (profile) {
          setName(profile.name ?? "");
          if (profile.gender === "FEMALE" || profile.gender === "MALE") {
            setGender(profile.gender);
          }
          setBirthDate(profile.birthDate ?? "");

          // birthTime 이 "HH:MM:SS" 로 올 수 있어서 앞 5자리만 사용
          if (profile.birthTime && !profile.birthTimeUnknown) {
            setBirthTime(profile.birthTime.slice(0, 5)); // "HH:MM"
          } else {
            setBirthTime("");
          }

          setBirthTimeUnknown(profile.birthTimeUnknown);
        }
      } catch (e) {
        console.error("프로필 조회 실패", e);
        // 프로필 없거나 에러 나도 폼은 빈 상태로 두고 진행
      }
    };

    fetchProfile();

    return () => clearTimeout(t);
  }, []);

  // ===== 저장 & 다음 버튼 클릭 =====
  const handleNext = async () => {
    try {
      setSaving(true);

      await api.post("/api/profile", {
        name,
        gender,
        birthDate: birthDate || null,                         // 빈 값이면 null
        birthTime: birthTimeUnknown || !birthTime ? null : birthTime,
        birthTimeUnknown,
      });

      const nextUrl = productId
        ? `/dup?productId=${productId}`
        : "/dup";
      navigate(nextUrl);
    } catch (e) {
      console.error("프로필 저장 실패", e);
      alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  // ===== 스켈레톤 =====
  if (loading) {
    return (
      <div className="Min390Max">
        {/* Header */}
        <div className="skeleton-header"></div>

        {/* 이름 입력 */}
        <div className="input-wrap mt-90">
          <div className="skeleton-input"></div>
        </div>

        {/* 성별 체크박스 */}
        <div className="input-wrap">
          <div className="input-wrap-check d-flex">
            <div className="skeleton-checkbox"></div>
            <div className="skeleton-checkbox"></div>
          </div>
        </div>

        {/* 생년월일 입력 */}
        <div className="input-wrap">
          <div className="skeleton-input"></div>
        </div>

        {/* 태어난 시간 */}
        <div className="input-wrap-small">
          <div className="d-flex align-items-center justify-content-between">
            <div className="skeleton-input w-50"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-checkbox-small"></div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="input-btn-wrap mt-4">
          <div className="skeleton-btn"></div>
        </div>

        {/* Footer */}
        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }

  // ===== 실제 화면 =====
  return (
    <>
      <div className="Min390Max">
        <NomalHeader />

        {/* 이름 */}
        <div className="input-wrap">
          <div>
           <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="예:홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-user"
            />
          </div>
        </div>

        {/* 성별 */}
        <div className="input-wrap mt-56">
          <div className="input-wrap-check">
            <div className="edit">
              <input
                type="checkbox"
                id="female"
                checked={gender === "FEMALE"}
                onChange={() => setGender("FEMALE")}
              />
              <label htmlFor="female">여성</label>
            </div>
            <div className="edit">
              <input
                type="checkbox"
                id="male"
                checked={gender === "MALE"}
                onChange={() => setGender("MALE")}
              />
              <label htmlFor="male">남성</label>
            </div>
          </div>
        </div>

        {/* 생년월일 */}
        <div className="input-wrap mt-56">
          <div>
            <label htmlFor="birthDate">생년월일 (양력기준으로 입력해 주세요)</label>
            <input
              id="birthDate"
              type="text"
              placeholder="예:1992-07-15(양력)"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        {/* 태어난 시간 */}
        <div className="input-wrap-small">
          <label htmlFor="birthTime">태어난 시간</label>
          <div className="d-flex align-items-center justify-content-between">
            <input
              id="birthTime"
              type="text"
              placeholder="예:08:30"
              className="date input-bg-gray"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={birthTimeUnknown}
            />
            <div className="d-flex align-items-center">
            <span className="paid-fs-15">모르겠어요</span>
            <input
              type="checkbox"
              className="check mx-3"
              checked={birthTimeUnknown}
              onChange={(e) => {
                const checked = e.target.checked;
                setBirthTimeUnknown(checked);
                if (checked) {
                  setBirthTime("");
                }
              }}
            />
            </div>
          </div>
        </div>
              {/* 버튼 + Footer */}
      <div className="input-btn-wrap">
        <button
          className="basicGray100"
          onClick={handleNext}
          disabled={saving}
        >
          {saving ? "저장 중..." : "다음"}
        </button>
      </div>
      </div>


      <Footer />
    </>
  );
};

export default PaidInput;
