import { useState, useEffect } from "react";
import "./DetailSkeleton.scss";
import RightArrow from "../08_svg/RightArrow";
import FreeDetailHeader from "../include/header/FreeDetailHeader";
import MoneyImg from "../08_svg/MoneyImg";
import DesThumbImg from "../08_svg/DesThumbImg";

const Detail = () => {

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200); // 1.2초 후 로딩 완료
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      
      <div className="Min390Max">
      <FreeDetailHeader />
        

        {/* 배너 스켈레톤 */}
        <div className="banner-wrap d-flex justify-content-between mt90">
          <div className="skeleton-img w-40"></div>
          <div className="skeleton-line w-50"></div>
        </div>

        {/* 질문 섹션 */}
        {[1, 2, 3].map((q) => (
          <div key={q} className="detail-text-wrap mt-4">
            <div className="skeleton-number mb-2"></div>
            <div className="skeleton-line w-80 mb-2"></div>
            <div className="skeleton-line w-90 mb-1"></div>
            <div className="skeleton-line w-100"></div>
            <hr className="my-3" />
          </div>
        ))}

        {/* 배너 */}
        <div className="banner-wrap mt-4">
          <div className="banner d-flex justify-content-between">
            <div className="skeleton-line w-50 h-20"></div>
            <div className="skeleton-img w-15"></div>
            <div className="skeleton-line w-10 h-20"></div>
          </div>
        </div>

        {/* 하단 추천 섹션 */}
        <div className="free-bottom-text-wrap mt-4">
          <div className="skeleton-line w-30 mb-3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="d-flex justify-content-between mb-2">
              <div className="skeleton-img w-25 h-25"></div>
              <div className="w-70">
                <div className="skeleton-line w-80 mb-1"></div>
                <div className="skeleton-btn w-50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
    return(
<>
<FreeDetailHeader/>
   <div className="Min390Max">
 
    
    <div className="banner-wrap d-flex">
        <img src="/svg/top1.png" alt="" />
        <div className="mx-3">
            <div className="basicGray2">무료체험판</div>
            <p>내곁의 사람, 다른 이에게 끌리고 있을까</p>
        </div>
    </div>

    <div className="detail-text-wrap">
        <div className="number">
            Q1
        </div>
        <h1>지금 그의 마음은 여전히 내 곁에 머물고 있을까?</h1>
        <p>
        사주 흐름을 보면 기본적으로 인연의 끌림은 유지되고 있습니다. 다만 월운(月運)의 기운이 변하는 시기라, 마음이 흔들리거나 외부에 시선이 갈 가능성이 있습니다. 그러나 이는 일시적인 기류일 뿐, 본질적인 마음은 여전히 당신 곁에 머무르는 모습이 강하게 보입니다.
        </p>
    </div>

    <div className="detail-text-wrap">
        <div className="number">
            Q2
        </div>
        <h1>혹시 다른 사람에게 마음이 기울고 있는건 아닐까?</h1>
        <p>
        상대방의 사주 속 정인(正印)과 관성(官星) 흐름을 보면, 기본적으로 안정과 책임감을 중시하는 기운이 있습니다. 다른 사람에게 쉽게 빠지는 성향은 강하지 않지만, 작은 유혹이나 새로운 자극에는 흔들릴 수 있는 약한 틈이 있습니다. 신뢰를 유지하고 대화를 이어가는 것이 중요합니다.
        </p>
    </div>
   
    <div className="detail-text-wrap">
        <div className="number">
            Q3
        </div>
        <h1>앞으로 우리의 관계는 안정적으로 이어질까, 흔들리게 될까?</h1>
        <p>
        세운(歲運)의 기운은 전반적으로 평온한 흐름을 보입니다. 다만 작은 사건이나 오해가 생기면 균열로 번질 수 있으니, 지금은 서로의 마음을 자주 확인하고 안정감을 주는 것이 필요합니다. 올바른 신뢰를 쌓는다면 장기적으로는 안정된 인연으로 이어질 가능성이 큽니다.
        </p>
    </div>

    <div className="banner-wrap mt-52">
        <div className="banner d-flex justify-content-between">
            <div className="">
                <h5>
                월급쟁이에서 벗어나, 대박의 길로
                </h5>
                <p>퇴사 후 대박 터질 타이밍 알려드립니다.</p>
            </div>
            <MoneyImg/>
            <div className="">
            <RightArrow/>
            </div>
        </div>
    </div>

<div className="free-bottom-text-wrap">
    <h5>이런 운세는 어때요?</h5>
    <div className="d-flex py-2">
        <div className="">
           <DesThumbImg/>
        </div>

        <div className="mx-3">
            <p>내 곁의 사람, 다른 이에게 끌리고 있을까?</p>
            <button className="basicBtn">심화 해석판</button>
        </div>
        
    </div>


    <div className="d-flex mt-2 py-2">
        <div className="">
           <DesThumbImg/>
        </div>
        
        <div className="mx-3">
            <p>내 곁의 사람, 다른 이에게 끌리고 있을까?</p>
            <button className="basicGray">심화 해석판</button>
        </div>
        
    </div>

        <div className="d-flex mt-2 py-2">
        <div className="">
           <DesThumbImg/>
        </div>
        
        <div className="mx-3">
            <p>내 곁의 사람, 다른 이에게 끌리고 있을까?</p>
            <button className="basicBtn">심화 해석판</button>
        </div>
        
    </div>
</div>

    </div>
</>
    );  
}
export default Detail;