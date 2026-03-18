import { useEffect, useState } from "react";
import "./SessionSkeleton.scss";

const SessionPopup = () => {

    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  /* ============================
     스켈레톤 UI
  ============================ */
  if (isLoading) {
    return (
      <div className="modal-wrap-nomal">
        <div className="popup2">

          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>

          <div className="mt-3">
            <div className="skeleton-btn"></div>
          </div>

        </div>
      </div>
    );
  }
   
return(
    <>
<div className="modal-wrap-nomal">
    <div className="popup2">
        <h5>로그인이 필요해요</h5>
        <p>계속 보시려면 다시 로그인해 주세요</p>
        <div className="">
            <button className="basicMint">로그인 하기</button>
        </div>
    </div>
</div>
    </>    
    );
}
export default SessionPopup;