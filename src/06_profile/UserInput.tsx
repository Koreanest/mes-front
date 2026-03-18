import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistHeader from "../include/header/RegistHeader";
import RightArrow from "../08_svg/RightArrow";
import api from "../api/client";
import "./PaySkeleton.scss"; // 기존 스켈레톤 스타일 재사용

type Gender = "FEMALE" | "MALE" | "";

interface UserProfileResponse {
  email: string;
  profile: {
    id: number;
    name: string | null;
    gender: Gender | null;
    birthDate: string | null;
    birthTime: string | null;
    birthTimeUnknown: boolean;
    user?: {
      realName?: string | null;
      birthDate?: string | null;
      gender?: string | null; // 'M' / 'F' 가능성
    };
  } | null;
}

const UserInput = () => {
  const navigate = useNavigate();

  // 스켈레톤 로딩
  const [isLoading, setIsLoading] = useState(true);

  // 폼 상태
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [birthDate, setBirthDate] = useState(""); // "YYYY-MM-DD"
  const [birthTime, setBirthTime] = useState(""); // "HH:mm"
  const [birthTimeUnknown, setBirthTimeUnknown] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  // 1) 스켈레톤 타이머
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 2) 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<UserProfileResponse>("/api/profile");
        const { profile } = res.data;

        if (!profile) {
          return;
        }

        // 이름: 프로필 name이 없으면 본인인증 이름(realName) 사용
        const resolvedName =
          (profile.name ?? "").trim() ||
          (profile.user?.realName ?? "").trim();

        // 성별: 프로필 gender 우선, 없으면 UserEntity.gender 'M' / 'F'를 매핑
        let resolvedGender: Gender = "";
        if (profile.gender === "FEMALE" || profile.gender === "MALE") {
          resolvedGender = profile.gender;
        } else if (profile.user?.gender === "M") {
          resolvedGender = "MALE";
        } else if (profile.user?.gender === "F") {
          resolvedGender = "FEMALE";
        }

        // 생년월일: 프로필 birthDate 우선, 없으면 UserEntity.birthDate
        const resolvedBirthDate =
          profile.birthDate ?? profile.user?.birthDate ?? "";

        // 태어난 시간: "HH:mm:ss" → "HH:mm" 형식으로 잘라서 사용
        const resolvedBirthTime = profile.birthTime
          ? profile.birthTime.substring(0, 5)
          : "";

        setName(resolvedName);
        setGender(resolvedGender);
        setBirthDate(resolvedBirthDate);
        setBirthTime(resolvedBirthTime);
        setBirthTimeUnknown(profile.birthTimeUnknown ?? false);
      } catch (e) {
        console.error("프로필 조회 실패:", e);
        // 필요하면 여기서 에러 토스트/알림 추가 가능
      }
    };

    fetchProfile();
  }, []);

  // 저장 버튼 클릭
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = {
        name: name || null,
        gender: gender || null, // "FEMALE" / "MALE"
        birthDate: birthDate || null, // "YYYY-MM-DD"
        birthTime:
          birthTimeUnknown || !birthTime ? null : birthTime, // "HH:mm", 모르면 null
        birthTimeUnknown,
      };

      await api.post("/api/profile", payload);

      // 저장 후 프로필 선택 화면으로 이동
      navigate("/profile");
    } catch (e) {
      console.error("프로필 저장 실패:", e);
      alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  // ============================
  // 스켈레톤 UI
  // ============================
  if (isLoading) {
    return (
      <div className="Min390Max">
        <RegistHeader />

        <div className="mypage-wrap">
          <div className="mypage-input-wrap skeleton-box">
            <div className="skeleton-text long"></div>
            <div className="skeleton-input mt-2"></div>
          </div>

          <div className="input-wrap mt-5 skeleton-box">
            <div className="skeleton-text medium"></div>
            <div className="d-flex justify-content-between mt-2">
              <div className="skeleton-checkbox"></div>
              <div className="skeleton-checkbox"></div>
            </div>
          </div>

          <div className="mypage-input-wrap mt-5 skeleton-box">
            <div className="skeleton-text long"></div>
            <div className="skeleton-input mt-2"></div>
          </div>

          <div className="input-wrap-small mt-5 skeleton-box">
            <div className="skeleton-text medium"></div>
            <div className="d-flex justify-content-between mt-2">
              <div className="skeleton-input short"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-checkbox"></div>
            </div>
          </div>

          <div className="user-btn-wrap mt-4">
            <div className="skeleton-btn long"></div>
          </div>
        </div>
      </div>
    );
  }

  // ============================
  // 실제 페이지
  // ============================
  return (
    <>
    <RegistHeader />
      <div className="Min390Max">
        

        <div className="mypage-wrap">
          {/* 이름 */}
          <div className="mypage-input-wrap">
            <div>
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                id="name"
                type="text"
                className="form-control input-user"
                placeholder="예 홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* 성별 */}
          <div className="input-wrap mt-52">
            <div className="input-wrap-check">
              <div className="edit">
                <input
                  type="checkbox"
                  id="female"
                  checked={gender === "FEMALE"}
                  onChange={() =>
                    setGender(gender === "FEMALE" ? "" : "FEMALE")
                  }
                />
                <label htmlFor="female">여성</label>
              </div>
              <div className="edit">
                <input
                  type="checkbox"
                  id="male"
                  checked={gender === "MALE"}
                  onChange={() => setGender(gender === "MALE" ? "" : "MALE")}
                />
                <label htmlFor="male">남성</label>
              </div>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="mypage-input-wrap mt-52">
            <div>
              <label htmlFor="birthDate" className="form-label">
                생년월일 (양력기준으로 입력해 주세요)
              </label>
              <input
                id="birthDate"
                type="text"
                className="form-control input-user"
                placeholder="예 1992-07-15(양력)"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>

          {/* 태어난 시간 + 탈퇴 */}
          <div className="mypage-input-wrap mt-52">
            <label htmlFor="birthTime">태어난 시간</label>
            <div className="d-flex align-items-center justify-content-between">
              <input
                id="birthTime"
                type="text"
                placeholder="예: 12:30"
                className="birth"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                disabled={birthTimeUnknown}
              />
              <div className="d-flex align-items-center">
              <span className="fs-15-gray-500">모르겠어요</span>
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

          {/* 저장하기 버튼 */}
          <div className="user-btn-wrap2">
            <div className="d-flex justify-content-start mt-2 mb-4">
              <a href="/out" className="outBtn">
                탈퇴하기{" "}
                <span>
                  <RightArrow />
                </span>
              </a>
            </div>
            <button
              type="button"
              className="basicGray100"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "저장 중..." : "저장하기"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInput;
