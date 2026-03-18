import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";
import { useNavigate } from "react-router-dom";

const ServiceHeader = () => {

        const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 한 단계 뒤로가기
    };

    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
            <div onClick={goBack} className="back-btn">
                <BackArrowImg/>
            </div>
                <h3>서비스 이용약관</h3>
                <div>
                    
                </div>
            </header>        
        </div>
</>
    );
}
export default ServiceHeader;