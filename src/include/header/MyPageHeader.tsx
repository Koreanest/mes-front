import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";

const MyPageHeader = () => {
    return(
        <>
        <div className="detail-header">
        <HpTop2 />
        <header className="">
            <div className=""><BackArrowImg/></div>
            <h3 className="">마이페이지</h3>
            <div className=""></div>
        </header>
    </div>
        </>
    )
}
export default MyPageHeader;