import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";
import { useNavigate } from "react-router-dom";

const PriceHeader = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 한 단계 뒤로가기
    };

    return(
    <>
    <div className="headerSet">
            <HpTop2 />
            <header className="">
            <div onClick={goBack}>
                <BackArrowImg/>
            </div>
                <h3>결제</h3>
                <div></div>
            </header>        
    </div>
    </>    
    );
}
export default PriceHeader;