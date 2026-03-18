import { useEffect, useState } from "react";
import Footer from "../include/footer/Footer";
import EndHeader from "../include/header/EndHeader";
import EndHiImg from "../08_svg/EndHiImg";
import "./DuplexEndSkeleton.scss";
import PresentImg from "../08_svg/PresentImg";
import DownloadImg from "../08_svg/downloadImg";

const DuplexEnd = () => {

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="Min390Max">
        {/* Header */}
        <div className="skeleton-header"></div>

        {/* 메인 이미지 */}
        <div className="mt-80 dup-wrap p-0 d-flex justify-content-center">
          <div className="skeleton-img-large"></div>
        </div>

        {/* 추천 운세 카드 */}
        <div className="wait-wrap mt-4">
          <div className="skeleton-title short mb-3"></div>
          <div className="wait-wrap-over d-flex justify-content-between">
            {[1, 2].map((i) => (
              <div className="wait" key={i}>
                <div className="skeleton-img-small"></div>
                <div className="skeleton-btn my-2"></div>
                <div className="skeleton-title short mt-2"></div>
                <div className="skeleton-title shorter mt-1"></div>
                <div className="skeleton-price mt-1"></div>
                <div className="d-flex mt-1">
                  <div className="skeleton-price-bar"></div>
                  <div className="skeleton-price-bar ml-2"></div>
                </div>
                <div className="d-flex mt-1">
                  <div className="skeleton-price-bar small"></div>
                  <div className="skeleton-price-bar ml-2 small"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="double-btn-wrap2 d-flex justify-content-between mt-4">
          <div className="w-50">
            <div className="skeleton-btn"></div>
          </div>
          <div className="mx-1"></div>
          <div className="w-50">
            <div className="skeleton-btn"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="skeleton-footer"></div>
      </div>
    );
  }



    return(
<>
<EndHeader/>
   <div className="Min390Max"> 
        
        <div className="dup-wrap p-0 d-flex justify-content-center">
          <EndHiImg/>
        </div>

      <div className="present-wrap">
          <div className="present">

              <div className="left d-flex">
                <PresentImg/>
                <div className="left-text">
                  <h5>운세 구매 고객 전용 쿠폰</h5>
                  <h3>3,000원</h3>
                </div>
              </div>
              <div className="rightDown">
                <DownloadImg/>
              </div>
              {/* 쿠폰발급하면 이부분이 나와야 해요
              <div className="rightDown">
                <h5>
                  발급<br/>
                  완료
                </h5>
              </div>*/}

          </div>
        </div>

        <div className="double-btn-wrap2 d-flex justify-content-between">
            <div className="w-50">
                <button className="basicMintGray">홈으로 가기</button>
            </div>
            <div className="mx-1"></div>
            <div className="w-50">
                <button className="basicMint">다른 운세 보기</button>
            </div>            
        </div>

<div className="dvider12 mb46"></div>
     
        <div className="wait-wrap">
            <h5>이런 운세는 어때요?</h5>
            <div className="wait-wrap-over">
                
                <div className="wait">                    
                    <img src="/svg/paid/small.png" alt="" />
                    <button className="basicBtn my-2">심화해석판</button>
                    <h4>혹시 지금 바람 피우고 있을까?</h4>
                    <p className="line">25,800원</p>
                    <div className="d-flex">
                        <div className="red">50%</div>
                        <div className="red-right">12,900원</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="green-l">9,900원</div>
                        <div className="green-r">쿠폰적용가</div>
                    </div>
                </div>

                <div className="wait">                    
                    <img src="/svg/paid/small.png" alt="" />
                    <button className="basicBtn my-2">심화해석판</button>
                    <h4>혹시 지금 바람 피우고 있을까?</h4>
                    <p className="line">25,800원</p>
                    <div className="d-flex">
                        <div className="red">50%</div>
                        <div className="red-right">12,900원</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="green-l">9,900원</div>
                        <div className="green-r">쿠폰적용가</div>
                    </div>
                </div>

    
            </div>

        </div>

        


</div>
    <Footer/>
</>
    );  
}
export default DuplexEnd;