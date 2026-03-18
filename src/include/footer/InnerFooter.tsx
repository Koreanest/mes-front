import LeftArrow from "../../08_svg/LeftArrow";
import RightArrow from "../../08_svg/RightArrow";

const InnerFooter=()=> {
    return(
<>
<div className="inner-footer fixed-bottom bg-white">
    <div className="d-flex">
        <img src="/svg/paid/adi.png" alt="" />
        <div className="">03/ 10</div>
    </div>
    <div className="d-flex down">
        <div className=""><span className=""><LeftArrow/></span>이전</div>
        <div className=""><span className="mx-3">|</span></div>
        <div className=""><span className="">다음</span><RightArrow/></div>
    </div>
</div>
</>
    );

}
export default InnerFooter;