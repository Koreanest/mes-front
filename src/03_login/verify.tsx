// src/03_login/Verify.tsx
import { useEffect, useRef, useState } from "react";
import api from "../api/client";

interface InicisStartData {
  mid: string;
  reqSvcCd: string;
  mtxId: string;       
  authHash: string;
  reservedMsg: string;
  directAgency: string;
  successUrl: string;
  failUrl: string;

  flgFixedUser?: string;
  userName?: string;
  userPhone?: string;
  userBirth?: string;
  userHash?: string;
}

const Verify: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [data, setData] = useState<InicisStartData | null>(null);

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        const res = await api.get<InicisStartData>(
          "/api/v1/auth/verify/inicis/start"
        );
        console.log("inicis start data:", res.data);
        setData(res.data);
      } catch (e) {
        console.error(e);
        alert("본인인증을 시작할 수 없습니다. 다시 로그인 후 시도해 주세요.");
      }
    };

    fetchStartData();
  }, []);

  useEffect(() => {
    if (!data || !formRef.current) return;

    // 팝업 없이 현재 창에서 자동 submit
    formRef.current.setAttribute("target", "_self");
    formRef.current.setAttribute("method", "POST");
    formRef.current.setAttribute("action", "https://sa.inicis.com/auth");
    formRef.current.submit();
  }, [data]);

  if (!data) {
    return <div>본인인증 준비 중입니다...</div>;
  }

  return (
    <div>
      <h1>본인인증 진행 중...</h1>
      <p>잠시 후 본인인증이 진행됩니다.</p>

      <form ref={formRef}>
        <input type="hidden" name="mid" value={data.mid} />
        <input type="hidden" name="reqSvcCd" value={data.reqSvcCd} />
        <input type="hidden" name="identifier" value="나다운 본인인증" />
        <input type="hidden" name="mTxId" value={data.mtxId} />
        <input type="hidden" name="authHash" value={data.authHash} />
        <input type="hidden" name="reservedMsg" value={data.reservedMsg} />
        <input type="hidden" name="directAgency" value={data.directAgency} />
        <input type="hidden" name="successUrl" value={data.successUrl} />
        <input type="hidden" name="failUrl" value={data.failUrl} />

        {/* 고정사용자 모드 끄기: 서버에서 안 내려줘도 기본값 N */}
        <input
          type="hidden"
          name="flgFixedUser"
          value={data.flgFixedUser ?? "N"}
        />

        {/* SA 해시에 들어가는 필드들 (지금은 공백이어도 그대로 맞춰서 보냄) */}
        <input type="hidden" name="userName" value={data.userName ?? ""} />
        <input type="hidden" name="userPhone" value={data.userPhone ?? ""} />
        <input type="hidden" name="userBirth" value={data.userBirth ?? ""} />
        <input type="hidden" name="userHash" value={data.userHash ?? ""} />

        <noscript>
          <button type="submit">본인인증 진행</button>
        </noscript>
      </form>
    </div>
  );
};

export default Verify;
