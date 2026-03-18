import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";
import { useNavigate } from "react-router-dom";

const OutHeader = () => {

    const navigate = useNavigate();
    return(
        <>
      <div className="detail-header">
        <HpTop2 />
        <header className="">
            <div onClick={() => navigate(-1)} className="back-btn">
                <BackArrowImg/>
            </div>
            <h3 className="">회원탈퇴</h3>
            <div className=""></div>
        </header>
    </div>


        </>
    )
}
export default OutHeader;
