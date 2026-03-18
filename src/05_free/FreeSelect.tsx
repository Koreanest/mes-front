import { useState, useEffect } from "react";
import SImg1 from "../08_svg/SImg1";
import SImg2 from "../08_svg/SImg2";
import SImg3 from "../08_svg/SImg3";
import SImg4 from "../08_svg/SImg4";
import Footer from "../include/footer/Footer";
import SelectHeader from "../include/header/SelectHeader";


const FreeSelect = () => {
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

<div className="select-wrap mt-95">
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

<div className="select-wrap d-flex justify-content-between">
    <div className="pic-wrap d-flex align-items-center">
        <div className="radio mx-2">
            <input type="radio" className="radioBtn"/>
        </div>
       <div className="">
<SImg2/>
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

<div className="select-wrap d-flex justify-content-between">
    <div className="pic-wrap d-flex align-items-center">
        <div className="radio mx-2">
            <input type="radio" className="radioBtn"/>
        </div>
       <div className="">
<SImg3/>

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

<div className="select-wrap d-flex justify-content-between">
    <div className="pic-wrap d-flex align-items-center">
        <div className="radio mx-2">
            <input type="radio" className="radioBtn"/>
        </div>
       <div className="">
<SImg4/>
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

<div className="select-btn-wrap2">
    <div className="w-50">
        <a className="basicMint" >사주정보 추가</a>

    </div>
    <div className="w-50">
        <a className="basicMintGray" href="/loading">다음</a>
    </div>
</div>

</div>

<Footer/>
</>
    );  
}
export default FreeSelect;