
import { useEffect, useState } from "react";
import HpTop2 from "../include/HpTop2";
import ServiceImg from "../08_svg/ServiceImg";
import "../assets/scss/ServiceSkeleton.scss"; 


const ServiceInspection = () => {

const [isLoading, setIsLoading] = useState(true);

  // 페이지 진입 후 1.2초 뒤 실제 화면 보여주기
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // === 스켈레톤 UI ===
  if (isLoading) {
    return (
      <div className="Min390Max">
        <HpTop2 />

        <div className="service-wrap">
          <div className="service">

            {/* 이미지 영역 */}
            <div className="service-img skeleton-block"></div>

            <div className="service-textwrap">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>

          </div>
        </div>

        <div className="g39010 my-5"></div>

        <div className="service-bottom">
          <h5 className="skeleton-title short"></h5>
          <hr />

          <div className="service-bottom-inner">
            <div>
              <h5 className="skeleton-text short"></h5>
              <p className="skeleton-text"></p>
            </div>
          </div>

          <div className="service-bottom-inner">
            <div>
              <h5 className="skeleton-text short"></h5>
              <p className="skeleton-text"></p>
            </div>
          </div>

          <hr />
        </div>

        <div className="btn-wrap4">
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
  <div className="service-wrap">
    <div className="service">
        <div className="service-img">
           <ServiceImg/>
        </div>
        <div className="service-textwrap">
            <h1>서버 점검 중이에요</h1>
            <p>
                점검이 끝나면 정상적으로 이용 가능합니다
                <br/>더나은 서비스로 보답하겠습니다
            </p>
        </div>
    </div>
    
  </div>

  <div className="g39010 my-5"></div>
  <div className="service-bottom">
    <h5>점검안내</h5>
    <hr />
    <div className="service-bottom-inner">
        <div className="">
            <h5><span>&nbsp;·&nbsp;</span>점검 일시:</h5>
            <p>2025년 9월 30일(화) 02:00 ~ 05:00(약 3시간 예정)</p>
        </div>
    </div>
    <div className="service-bottom-inner">
        <div className="">
            <h5><span>&nbsp;·&nbsp;</span>점검 내용:</h5>
            <p>안정성 강화 및 시스템 개선</p>
        </div>
    </div>
     <hr/>
  </div>

  <div className="btn-wrap4">
    <div className="d-flex space-between">
        <a className="basicMintGray" href="/">홈으로 가기</a>
        <button className="basicMint">다시 시도하기</button>
    </div>
  </div>

  
   </div> 
</>
    );
}
export default ServiceInspection;