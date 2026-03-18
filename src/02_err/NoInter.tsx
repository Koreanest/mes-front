
import HpTop2 from "../include/HpTop2";
import NoInterImg from "../08_svg/NoInterImg";

const NoInter = () => {
    return(
<>
  <div className="Min390Max">
  <HpTop2/>
  <div className="err404-wrap">
    <div className="err404">
        <div className="err404-img">
           <NoInterImg/>
        </div>
        <div className="err404-textwrap">
            <h1>인터넷 연결이 불안정해요</h1>
            <p>
                와이파이나 데이터를 확인한 뒤  
                <br/>다시 시도해 주세요.
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
export default NoInter;