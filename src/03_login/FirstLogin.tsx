
import BackHeader from "../include/header/BackHeader";
import FiveImg from "../08_svg/FiveImg";
import NowImg from "../08_svg/NowImg";


const FirstLogin: React.FC = () => {

const handleKakaoLogin =():void => {
  // window.location.href = "https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3D3dfe2feb0b73c0f3c93152a4c9ee9c83%26scope%3Dprofile_nickname%2520profile_image%26state%3DyGwy5DuY8-PdTUpbmn9f8Wpr810fHqspCc56rpm8Rxs%253D%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8383%252Flogin%252Foauth2%252Fcode%252Fkakao%26through_account%3Dtrue%26auth_tran_id%3DWKi6BALyESPxfKkM9OSbYMgSLMTnD8UkGF1UR-SZChcBDwAAAZqZk8eJ#webTalkLogin";
  window.location.href = "http://localhost:8383/oauth2/authorization/kakao";
}

const handleGoogleLogin = ():void => {
  // window.location.href = "https://accounts.google.com/v3/signin/accountchooser?client_id=1057151604719-7g72ipaiqtstp9h8k7hdpbmof6bamagv.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8383%2Flogin%2Foauth2%2Fcode%2Fgoogle&response_type=code&scope=profile+email&state=0VYHM91wEpOXS5kGvBOs-07SeRpoucegz2HFhsNaJuQ%3D&dsh=S152897183%3A1763513220669290&o2v=2&service=lso&flowName=GeneralOAuthFlow&opparams=%253F&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANBZYylB_07IkNyqVulU7HhqyQNJMBWc7z1gQorTesk_krNF3Zhzoaz8PrsqTcqYnxW4E1aJzl51uWJPo1dfWex6jy3iZbryBY2kje_Yd09nAD5drIcPqF69BMIhe5_HcW4ULFFDL5yBW9uyzcAruiV-rbmvO98gsjCo14lCRO6S-ayGBYfRwfINYA7fxhujeFStiycRagfnxAp8EMo04uvcBOQ7H7I3DaFbAh1d49PhBnZooNUWbu6HTkl3Za9jrnu35IvAZ6IEE65EcwNERkc8CtpXPSe_AGqzIOKTEAHzi4zzf_EScg-J9oJRdu_47mGCCTCjG5y0h8Yb2t20aT2Z91UVg7K4S3zOpR9p6Wo9hqq-3Pq3y8EglOElPr2A5AcTN8yFrFm2JbCvFmzawX2m06fdpk-i1B294VdYK7tdDsbh54E8fLYfBuWqDyHivXP-eoauIXfXfzIyD2fnN8aEEcBbw%26flowName%3DGeneralOAuthFlow%26as%3DS152897183%253A1763513220669290%26client_id%3D1057151604719-7g72ipaiqtstp9h8k7hdpbmof6bamagv.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=http%3A%2F%2Flocalhost%3A8383";
  window.location.href = "http://localhost:8383/oauth2/authorization/google";
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

  <div className="login-btn-wrap">
    <div className="now-wrap">
      <div className="now-box">
        <NowImg/>
      </div>
    </div>
    <button className="kakao" onClick={handleKakaoLogin}>
      <span><img src="/svg/login/kakao.png" alt="" /></span>카카오로 무료 체험시작하기</button>
    <div className="h16"></div>
    <button className="google" onClick={handleGoogleLogin}>
      <span><img src="/svg/login/google.png" alt="" /></span>Google로 무료체험 시작하기</button>
    <div className="login-btn-bottom-text">무료 체험후 자동 결제되지 않아요</div>
  </div>

   </div> 
</>
    );  
}
export default FirstLogin;

/*
최초코드

const handleKakaoLogin = async():Promise<void> => {
  try{
    const res = await axios.post<LoginResponse>(
      "http://localhost:8383/api/login/kakao",
      {email:"kakao_user@test.com"}
    );
    alert(res.data.message);
    console.log("유저 정보:", res.data.user);
  }catch(error){
    console.error("로그인 실패:", error);
    alert("카카오 로그인 실패");
  }
}

const handleGoogleLogin = async():Promise<void> => {
  try{
    const res = await axios.post<LoginResponse>(
      "http://localhost:8383/api/login/google",
      {email:"kakao_user@test.com"}
    );
    alert(res.data.message);
    console.log("유저 정보:", res.data.user);
  }catch(error){
    console.error("로그인 실패:", error);
    alert("Google 로그인 실패");
  }
}
*/