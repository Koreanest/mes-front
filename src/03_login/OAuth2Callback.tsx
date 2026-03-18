import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const OAuth2Callback: React.FC = () => {
  const navigate = useNavigate();
  const hasRunRef = useRef(false); // StrictMode 중복 방지

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const run = async () => {
      const searchParams = new URLSearchParams(window.location.search);

      // 1) token 및 lastLoginAt 읽기
      let token: string | null = searchParams.get("token");
      const lastLoginAt: string | null = searchParams.get("lastLoginAt");

      if (!token) {
        token = localStorage.getItem("accessToken");
      }

      if (!token) {
        navigate("/flogin", { replace: true });
        return;
      }

      // 2) 토큰 저장
      localStorage.setItem("accessToken", token);

      // 3) 마지막 로그인 시간 안내
      if (lastLoginAt) {
        alert(`마지막 로그인 시간: ${lastLoginAt}`);
      }

      try {
        // --------------------------------------------------------
        // 4) 본인인증 여부 먼저 체크
        // --------------------------------------------------------
        const verifyRes = await api.get("/api/v1/auth/verify/status");
        const { verified } = verifyRes.data as { verified: boolean };

        if (!verified) {
          // 아직 본인인증 안 한 상태 → 본인인증 화면으로
          navigate("/verify", { replace: true });
          return;
        }

        // --------------------------------------------------------
        // 5) 약관 동의 여부 체크
        // --------------------------------------------------------
        const termRes = await api.get("/api/v1/terms");
        const termData = termRes.data as {
          ageOver14?: boolean;
          termsOfUse?: boolean;
          privacyPolicy?: boolean;
        } | null;

        const termsAgreed =
          !!termData &&
          !!termData.ageOver14 &&
          !!termData.termsOfUse &&
          !!termData.privacyPolicy;

        if (!termsAgreed) {
          navigate("/agree", { replace: true });
          return;
        }

        // --------------------------------------------------------
        // 6) 모든 조건 충족 → 홈 이동
        // --------------------------------------------------------
        navigate("/", { replace: true });

      } catch (error: any) {
        console.error("Callback error:", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/flogin", { replace: true });
        } else {
          // 애매한 에러면 일단 로그인 페이지로
          navigate("/flogin", { replace: true });
        }
      }
    };

    run();
  }, [navigate]);

  return <div>소셜 로그인 처리 중입니다...</div>;
};

export default OAuth2Callback;
