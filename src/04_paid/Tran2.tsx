import { useState, useEffect } from "react";
import Footer from "../include/footer/Footer";
import ExitHeader from "../include/header/ExitHeader";
import InnerFooter from "../include/footer/InnerFooter";
import "./TranSkeleton2.scss";




const Tran2 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

   if (loading) {
    return (
      <div className="Min390Max">
        {/* Header 스켈레톤 */}
        <div className="skeleton-header"></div>

        {/* 타이틀 */}
        <div className="title-wrap mt-100">
          <div className="skeleton-line w-70 mb-2"></div>
          <div className="skeleton-line w-50"></div>
        </div>

        {/* 이미지 */}
        <div className="tran-img-wrap">
          <div className="skeleton-img mx-auto"></div>
        </div>

        {/* 버튼 */}
        <div className="trans-btn-wrap2 mt-3">
          <div className="skeleton-btn mx-auto"></div>
        </div>

        {/* Inner Footer */}
        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }

    return(
<>

<div className="Min390Max"> 
        <ExitHeader/>
<div className="title-wrap mt-100">
<h5>우리관계, 지금이 전환점일까?</h5>
<p>질문을 떠올리며 카드를 뽑아주세요</p>
</div>
</div>
<div className="tran-img-wrap">
<img src="/svg/paid/pic3.png" alt="" />
</div>
<div className="trans-btn-wrap2">
    <button className="basicMint">선택 완료</button>
</div>
<InnerFooter/>
    <Footer/>
</>
    );  
}
export default Tran2;