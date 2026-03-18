import { useEffect, useState } from "react";
import BackHeader from "../include/header/BackHeader";
import "./KakaoSkeleton.scss";
const Kakao = () => {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

    /* ======================
          스켈레톤 UI
  ====================== */
  if (loading) {
    return (
      <div className="Min390Max">

        <BackHeader />

        <div className="kakao-wrap mt-100">
          <div className="kakao-text-wrap">
            <div className="skeleton-title"></div>
            <div className="skeleton-title short"></div>
          </div>
        </div>

        <div className="kakao-sign">
          <div className="d-flex justify-content-between kakao-sign-wrap">
            <div className="left">
              <div className="skeleton-img-small"></div>
            </div>

            <div className="right">
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          </div>
        </div>

        <div className="complete-btn-wrap2">
          <div className="skeleton-btn"></div>
        </div>

      </div>
    );
  }

    return(
<>
<BackHeader/>
  <div className="Min390Max">
  
  <div className="kakao-wrap">
    <div className="kakao-text-wrap">
      <h2>이미 가입하신 계정이 있어요</h2>
      <h1>아래 계정으로 로그인해 보세요</h1>
    </div>
  </div>

  <div className="kakao-sign">
    <div className="d-flex justify-content-between kakao-sign-wrap">
      <div className="left">
<img src="/svg/login/kakaosmall.png" alt="" />
      </div>
      
      <div className="right">
        <p>bluebe***@kakao.com</p>
        <p className="gray">가입일:2025. 09. 16</p>
      </div>
    </div>
  </div>
  <div className="complete-btn-wrap3">
    <button className="kakao">
      <span><img src="/svg/login/kakao.png" alt="" /></span>kakao 계정으로 로그인
    </button>
  </div>
  
   </div> 
</>
    );  
}
export default Kakao;