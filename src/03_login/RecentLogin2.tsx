import FiveImg from "../08_svg/FiveImg";
import GoogleLogo from "../08_svg/GoogleLogo";
import KakaoLogo from "../08_svg/KakaoLogo";
import BackHeader from "../include/header/BackHeader";



const RecentLogin2 = () => {
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

  <div className="login-btn-wrap3">
    
    <button className="kakao">
      <span><KakaoLogo/></span>카카오로 무료 체험시작하기</button>
    <div className="h32"></div>
    <div className="upBtn"><span><img src="/svg/login/thun.png" alt="" /></span>최근 로그인</div>
    <button className="google">
      <span><GoogleLogo/></span>Google로 무료체험 시작하기</button>
    <div className="login-btn-bottom-text">무료 체험후 자동 결제되지 않아요</div>
  </div>

   </div> 
</>
    );  
}
export default RecentLogin2;