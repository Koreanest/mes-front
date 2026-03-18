import { useState, useEffect } from "react";
//import SelectLayer from "../07_modal/SelectLayer";
import SImg1 from "../08_svg/SImg1";
import Footer from "../include/footer/Footer";
import SelectHeader from "../include/header/SelectHeader";
import "./SelectSkeleton.scss";
import SajuNone from "../08_svg/SajuNone";


const SelectNone = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    // 스켈레톤 로딩 화면
    return (
      <div className="Min390Max">
        <div className="skeleton-header"></div>

        {/* 내 사주 섹션 */}
        <div className="select-wrap mt-95">
          <div className="skeleton-title w-30"></div>
        </div>
        <div className="underline"></div>

        {[1, 2, 3, 4].map((i) => (
          <div className="select-wrap d-flex justify-content-between mt-3" key={i}>
            <div className="pic-wrap d-flex align-items-center">
              <div className="skeleton-radio mx-2"></div>
              <div className="skeleton-img"></div>
            </div>
            <div className="text-wrap mx-2 w-70">
              <div className="skeleton-text-line w-80 mb-2"></div>
              <div className="skeleton-text-line w-60"></div>
            </div>
          </div>
        ))}

        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }

    return(
<>
<div className="Min390Max">
<SelectHeader/>

<div className="select-wrap">
    <h5>내 사주</h5>        
</div> 
<div className="underline"></div>


<div className="select-wrap d-flex justify-content-between">
    <div className="pic-wrap d-flex align-items-center">
        <div className="radio mx-2">
            <input type="radio" className="radioBtn"/>
        </div>
       <div className="">
     
<SImg1/>
       </div>
    </div>
    
    <div className="text-wrap mx-2">
        <div className="d-flex justify-content-between">
            <h3>별빛속에 피어난 작은 꿈(본인)</h3>
            <button>&middot;&middot;&middot;</button>
        </div>
        <p>
        양력 1994.07.23 (午)시<br/>
        원숭이띠 <span>|</span> 물고기자리 <span>|</span> 여성
        </p>
    </div>
</div>   

<div className="select-wrap mt-3">
    <h5>함께 보는 사주</h5>        
</div> 
<div className="underline"></div>

<div className="d-flex justify-content-between align-tems-center">
<div className="noneBox">
<div className="img-wrap d-flex justify-content-center">
<SajuNone/>
</div>
<div className="text-center">
    함께 보는 사주를 등록해 보세요.<br/>
    소중한 인연의 운세를 함께 확인할 수 있어요
</div>
</div>
</div>

<div className="select-btn-wrap3">
    <div className="w-50">
        <a className="basicMint" >사주정보 추가</a>

    </div>
    <div className="w-50">
        <a className="basicMintGray" href="/pim">다음</a>
    </div>
</div>

</div>

<Footer/>
</>
    );  
}
export default SelectNone;