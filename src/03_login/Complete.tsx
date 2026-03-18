import { useEffect, useState } from "react";
import HpTop2 from "../include/HpTop2";
import CompImg from "../08_svg/CompImg";
import "./CompleteSkeleton.scss";
import { useNavigate } from "react-router-dom";

const Complete = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

if (loading) {
    return (
      <div className="Min390Max">

        <HpTop2 />

        <div className="complete-wrap">
          <div className="complete-img-wrap">
            <div className="skeleton-img"></div>
          </div>

          <div className="complete-text-wrap">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        </div>

        <div className="complete-btn-wrap">
          <div className="skeleton-btn"></div>
        </div>

      </div>
    );
  }

    return(
<>
  <div className="Min390Max">
  <HpTop2/>
  <div className="complete-wrap">
    <div className="complete-img-wrap">
      <CompImg/>
    </div>
    <div className="complete-text-wrap">
      <h1>가입 축하 쿠폰이 도착했어요</h1>
      <p>첫 결제 시 쿠폰이 자동 적용되요 <br/>
      지금부터 당신만의 운세 풀이를 만나보세요!
      </p>
    </div>
  </div>
  <div className="complete-btn-wrap">
    <button className="basicMint" onClick={() => navigate("/")}>운세보러가기</button>
  </div>
  
   </div> 
</>
    );  
}
export default Complete;