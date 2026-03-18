
import Err404Img from "../08_svg/Err404Img";
import HpTop2 from "../include/HpTop2";


const Err_404 = () => {
    return(
<>
  <div className="Min390Max">
  <HpTop2/>
  <div className="err404-wrap">
    <div className="err404">
        <div className="err404-img">
            <Err404Img/>
        </div>
        <div className="err404-textwrap">
            <h1>페이지를 찾을 수 없어요</h1>
            <p>
                주소가 잘못되었거나<br/>페이지가 변경되었을수 있어요.
            </p>
        </div>
    </div>
  </div>

  <div className="btn-wrap">
    <a className="basicMint" href="/">홈으로 가기</a>
  </div>

  
   </div> 
</>
    );
}
export default Err_404;