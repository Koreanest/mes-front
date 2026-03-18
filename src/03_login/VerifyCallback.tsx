// src/03_login/VerifyCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const VerifyCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");   // success / fail
    const code   = params.get("code") || "";
    const msg    = params.get("msg")  || "";

    const isPopup = !!(window.opener && !window.opener.closed);

    const goParent = (path: string) => {
      if (isPopup) {
        // 부모창 이동 + 팝업 닫기
        window.opener!.location.href = path;
        window.close();
      } else {
        // 혹시 팝업이 아닌 경우(직접 주소로 들어온 경우) 대비
        navigate(path, { replace: true });
      }
    };

    const run = async () => {
      if (status !== "success") {
        // 실패 케이스
        const decodedMsg = msg
          ? decodeURIComponent(msg)
          : "본인인증에 실패했습니다. 다시 시도해 주세요.";
        alert(decodedMsg);

        // 실패하면 그냥 로그인 화면으로
        goParent("/flogin");
        return;
      }

      // --- 여기서부터 성공 케이스 ---

      try {
        // (옵션) 백엔드에서 verified 플래그 한 번 더 확인
        const res = await api.get("/api/v1/auth/verify/status");
        const { verified } = res.data as { verified: boolean };

        if (!verified) {
          // 이론상 여기는 안 와야 하지만 방어코드
          alert("본인인증 결과를 확인하지 못했습니다. 다시 시도해 주세요.");
          goParent("/flogin");
          return;
        }

        // 다음 단계: 약관 동의 페이지로 부모창 이동
        goParent("/agree");

      } catch (e) {
        console.error(e);
        alert("본인인증 결과 확인 중 오류가 발생했습니다.");
        goParent("/flogin");
      }
    };

    run();
  }, [navigate]);

  return <div>본인인증 결과를 확인하고 있습니다...</div>;
};

export default VerifyCallback;
