
import HpTop2 from "../include/HpTop2";
import Err503Img from "../08_svg/Err503Img";

const Err_503 = () => {
    return(
<>
  <div className="Min390Max">
  <HpTop2/>
  <div className="err404-wrap">
    <div className="err404">
        <div className="err404-img">
            <Err503Img/>
        </div>
        <div className="err404-textwrap">
            <h1>서버에 잠시 과부하 상태에요</h1>
            <p>
                이용자가 많아 접속이 원할하지 않습니다
                <br/>잠시후 다시 시도해 주세요.
            </p>
        </div>
    </div>
  </div>

  <div className="btn-wrap">
    <div className="d-flex space-between">
        <a className="basicMintGray" href="/">홈으로 가기</a>
        <button className="basicMint">다시 시도하기</button>
    </div>
  </div>

  
   </div> 
</>
    );
}
export default Err_503;