import { useState, useEffect } from "react";
import "./FreeDetailSkeleton.scss";
import Footer from "../include/footer/Footer";
import DetailHeader from "../include/header/DetailHeader";
import Tab_Detail from "../include/Tab_Detail";
import MoneyImg from "../08_svg/MoneyImg";
import RightArrow from "../08_svg/RightArrow";
import { useSearchParams } from "react-router-dom";

const FreeDetail = () => {

  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("productId");
  const productId = productIdParam ? Number(productIdParam) : 0;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000); // 1초 후 로딩 완료
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="Min390Max">
        {/* 헤더 스켈레톤 */}
        <div className="skeleton-header mb-3"></div>

        {/* 탭 스켈레톤 */}
        <Tab_Detail productId={productId} /> {/* 실제 Tab 구조를 그대로 두되, 내부에서 skeleton-line 적용 가능 */}

        {/* 배너 스켈레톤 */}
        <div className="banner-wrap mt90">
          <div className="banner d-flex justify-content-between banner-text">
            <div className="w-60">
              <div className="skeleton-line mb-2 w-80 h-20"></div>
              <div className="skeleton-line w-100 h-16"></div>
            </div>
            <div className="skeleton-img w-15 h-50"></div>
            <div className="skeleton-line w-10 h-20"></div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

    return(
<>
<DetailHeader/>
   <div className="Min390Max">
    
        
        {/*<Tab_Detail productId={productId} />*/}
    <div className="cryimgwrap">
     <img src="/svg/free/cry.png" alt="" />
    </div>

    <div className="free-wrap mt-2">
    <div className="basicGray2">무료체험판</div>
    <p>내곁의 사람, 다른 이에게 끌리고 있을까</p>
</div>       

<div className="des">
<h5>운세 설명</h5>  
<p>언제부터인지, 그의 시선이 나 아닌 다른 곳에 머무는 것 같아 불안하지 않으신가요? 말 한마디, 작은 행동에도 혹시 마음이 흔들린 건 아닐까 의심되는 지금.
<br/>겉으로만 보이는 관계의 온도에 속지 말고, 당신 곁에 있는 마음이 진짜 사랑인지, 아니면 흔들리는 바람 같은 감정인지 보이지 않던 진실의 단서를 지금 확인해 보실 수 있습니다.</p>
</div>

<div className="des">
<h5>운세 구성</h5>
<div className="d-flex des-wrap">
  <div className="left">•</div>
  <p className="right">
    앞으로 이 관계는 안정적으로 이어질까, 흔들리게 될까?
  </p>
  <hr />
</div>  
<div className="d-flex des-wrap">
  <div className="left">•</div>
  <p className="right">
    의심과 불안을 줄이고 사랑을 지켜내려면 어떻게 해야 할까?
  </p>

</div> 
<div className="d-flex des-wrap">
  <div className="left">•</div>
  <p className="right">
    지금 그의 마음은 나에게 머물고 있을까, 다른 곳을 향하고 있을까?
  </p>
  <hr />
</div>  
</div>

    <div className="banner-wrap mt-52 mb-52">
    <div className="banner d-flex justify-content-between banner-text align-items-center">

            <h5>
            월급쟁이에서 벗어나, 대박의 길로<br/>
            <small>퇴사 후 대박 터질 타이밍 알려드립니다.</small>
            </h5>
        <MoneyImg/>
        <div className="">
        <RightArrow/>
        </div>
    </div>
</div>

 <div className="wait-wrap">
            <h5>이런 운세는 어때요?</h5>
            <div className="wait-wrap-over">
                
                <div className="wait">
                    <img src="/svg/paid/small.png" alt="" />
                    <div className="my-2">
                      <button className="basicBtn">심화 해석판</button>
                    </div>
                      <p className="fs-15-500-black">혹시 지금 바람 피우고 있을까?</p>
                      <p className="fs-13-400-gray">25,800원</p>
                      <p className="fs-15-700-black"><span className="coral">50%</span> 12,900원</p>
                      <p className="fs-16-700-green">9,900원<small>쿠폰적용가</small> </p>
                </div>

                <div className="wait">
                    <img src="/svg/paid/small.png" alt="" />
                    <div className="my-2">
                      <button className="basicBtn">심화 해석판</button>
                    </div>
                      <p className="fs-15-500-black">혹시 지금 바람 피우고 있을까?</p>
                      <p className="fs-13-400-gray">25,800원</p>
                      <p className="fs-15-700-black"><span className="coral">50%</span> 12,900원</p>
                      <p className="fs-16-700-green">9,900원<small>쿠폰적용가</small> </p>
                </div>
                
            </div>

        </div>

        <div className="double-btn-wrap d-flex justify-content-between">
   
                <a className="basicMint" href="/freeinput">지금 풀이보러 가기</a>
            
            
        </div>

    </div>
   
    <Footer/>
</>
    );  
}
export default FreeDetail;