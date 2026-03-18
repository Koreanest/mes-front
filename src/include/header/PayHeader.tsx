import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";
import { useNavigate } from "react-router-dom";

const PayHeader = () => {

    const navigate = useNavigate();
    return(
        <>
<div className="detail-header">
        <HpTop2 />
        <header className="d-flex justfify-content-around p20 align-items-center load-wrap ">
            <div onClick={() => navigate(-1)} className="back-btn">
                <BackArrowImg/>
            </div>
            <h3 className="">구매내역</h3>
            <div className=""></div>
        </header>
    </div>
        </>
    );

}
export default PayHeader;