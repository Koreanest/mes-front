import { useState, useEffect } from "react";
import Footer from "../include/footer/Footer";
import NomalHeader from "../include/header/NomalHeader";

const FreeInput = () => {
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

        {/* 이름 입력 */}
        <div className="input-wrap mt-90">
          <div className="skeleton-input"></div>
        </div>

        {/* 성별 체크박스 */}
        <div className="input-wrap">
          <div className="input-wrap-check d-flex">
            <div className="skeleton-checkbox"></div>
            <div className="skeleton-checkbox"></div>
          </div>
        </div>

        {/* 생년월일 입력 */}
        <div className="input-wrap">
          <div className="skeleton-input"></div>
        </div>

        {/* 태어난 시간 */}
        <div className="input-wrap-small">
          <div className="d-flex align-items-center justify-content-between">
            <div className="skeleton-input w-50"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-checkbox-small"></div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="input-btn-wrap mt-4">
          <div className="skeleton-btn"></div>
        </div>

        {/* Footer */}
        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }


    return(
<>

   <div className="Min390Max"> 
        <NomalHeader/>
<div className="input-wrap mt-90">
    <div className="">
        <label htmlFor="">이름</label>
        <input type="text" placeholder="예:홍길동"/>
    </div>
</div>

<div className="input-wrap">
    <div className="input-wrap-check">
        <div className="edit">
            
            <input type="checkbox" id="female" defaultChecked/>
            <label htmlFor="female">여성</label>
        </div>
        <div className="edit">           
            <input type="checkbox"  id="male"/>
            <label htmlFor="male">남성</label>
        </div>
    </div>
</div>

<div className="input-wrap">
    <div className="">
        <label htmlFor="">생년월일 (양력기준으로 입력해 주세요)</label>
        <input type="text" placeholder="예:1992-07-15(양력)"/>
    </div>
</div>

<div className="input-wrap-small">
        <label htmlFor="">태어난 시간</label>
    <div className="d-flex align-items-center justify-content-between">
        <input type="text" placeholder="예:1992-07-15(양력)" className="date input-bg-gray"/>
        <span className="paid-fs-15" >모르겠어요</span>
        <input type="checkbox" className="check"/>
    </div>
</div>
    </div>

    <div className="input-btn-wrap">
        <a className="basicGray100" href="/freeselect">다음</a>
    </div>
    <Footer/>
</>
    );  
}
export default FreeInput;