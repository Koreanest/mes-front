import { useEffect, useState } from "react";
import HpTop2 from "../include/HpTop2";
import Err500Img from "../08_svg/Err500Img";
import "./Err500Skeleton.scss";

const Err_500 = () => {
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* ============================
     스켈레톤 UI
  ============================ */
  if (isLoading) {
    return (
      <div className="Min390Max">
        <HpTop2 />

        <div className="err404-wrap">
          <div className="err404">

            {/* 이미지 자리 */}
            <div className="err404-img skeleton-block"></div>

            <div className="err404-textwrap">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>

          </div>
        </div>

        <div className="btn-wrap">
          <div className="d-flex space-between">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      </div>
    );
  }

    return(
<>
  <div className="Min390Max">
  <HpTop2/>
  <div className="err404-wrap">
    <div className="err404">
        <div className="err404-img">
            <Err500Img/>
        </div>
        <div className="err404-textwrap">
            <h1>서버에 문제가 발생했어요</h1>
            <p>
                일시적인 오류로 페이지를 불러오지 못했어요
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
export default Err_500;