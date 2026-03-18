

import BackHeader from "../include/header/BackHeader";



const Google = () => {
    return(
<>
<BackHeader/>
  <div className="Min390Max">

  <div className="kakao-wrap mt-100">
    <div className="kakao-text-wrap">
      <h2>이미 가입하신 계정이 있어요</h2>
      <h1>아래 계정으로 로그인해 보세요</h1>
    </div>
  </div>

  <div className="kakao-sign">
    <div className="d-flex justify-content-between kakao-sign-wrap">
      <div className="left">
<img src="/svg/login/googlesmall.png" alt="" />
      </div>
      
      <div className="right">
        <p>bluebe***@gmail.com</p>
        <p className="gray">가입일:2025. 09. 16</p>
      </div>
    </div>
  </div>
  <div className="complete-btn-wrap2">
 <button className="google">
      <span><img src="/svg/login/google.png" alt="" /></span>Google계정으로 로그인</button>
  </div>
  
   </div> 
</>
    );  
}
export default Google;