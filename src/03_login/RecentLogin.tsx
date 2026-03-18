import { useEffect, useState } from "react";
import FiveImg from "../08_svg/FiveImg";
import GoogleLogo from "../08_svg/GoogleLogo";
import KakaoLogo from "../08_svg/KakaoLogo";
import BackHeader from "../include/header/BackHeader";
import "./RecentLoginSkeleton.scss";

const RecentLogin = () => {
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="Min390Max">

        <BackHeader />

        <div className="login-text-wrap mt-80">
          <div className="login-text">
            <div className="skeleton-text short"></div>
            <div className="skeleton-title"></div>
          </div>
        </div>

        <div className="login-img-wrap">
          <div className="login-img skeleton-block"></div>
        </div>

        <div className="login-btn-wrap2">

          {/* 최근 로그인 버튼 */}
          <div className="skeleton-btn"></div>

          {/* 카카오 */}
          <div className="skeleton-btn large"></div>

          <div className="h16"></div>

          {/* 구글 */}
          <div className="skeleton-btn large"></div>

          {/* 하단 문구 */}
          <div className="skeleton-text small"></div>

        </div>

      </div>
    );
  }


    return(
<>
<BackHeader/>
  <div className="Min390Max">



  <div className="login-text-wrap">
    <div className="login-text">
        <p>나다운이 처음이라면</p>
        <h1>무료료 체험해 보세요!</h1>
    </div>
  </div>

  <div className="login-img-wrap">
    <div className="login-img">
        <FiveImg/>
    </div>
  </div>

  <div className="login-btn-wrap2">
    <div className="upBtn"><span><img src="/svg/login/thun.png" alt="" /></span>최근 로그인</div>
    <button className="kakao">
      <span className="mx-2"><KakaoLogo/></span>카카오로 무료 체험시작하기</button>
    <div className="h16"></div>
    <button className="google">
      <span className="mx-2"><GoogleLogo/></span>Google로 무료체험 시작하기</button>
    <div className="login-btn-bottom-text">무료 체험후 자동 결제되지 않아요</div>
  </div>

   </div> 
</>
    );  
}
export default RecentLogin;