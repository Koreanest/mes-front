
import { useEffect, useState } from "react";
import NopImg from "../08_svg/NopImg";
import BackHeader from "../include/header/BackHeader";

const Nop = () => {

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
        <BackHeader />

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

        <div className="btn-wrap3">
          <div className="d-flex space-between">
            <div className="skeleton-btn"></div>
          </div>
        </div>
      </div>
    );
  }

    return(
<>
  <div className="Min390Max">
  
<BackHeader/>

  <div className="err404-wrap">
    <div className="err404">
        <div className="err404-img">
            <NopImg/>
        </div>
        <div className="err404-textwrap">
            <h1>구매를 실패했어요</h1>
            <p>
                네트워크나 결제 수단을 확인한뒤  
                <br/>다시 시도해 보실래요?
            </p>
        </div>
    </div>
  </div>

<div className="btn-wrap5">
    <div className="d-flex space-between">
        <button className="basicMint">다시 구매하기</button>
    </div>
  </div>

  
   </div> 

</>
    );
}
export default Nop;