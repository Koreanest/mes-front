import HpTop2 from "../HpTop2";
import BackArrowImg from "../../08_svg/BackArrowImg";
import { useNavigate } from "react-router-dom";

const BackHeader = () => {
 const navigate = useNavigate();
    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
                <div onClick={() => navigate(-1)} >
                <BackArrowImg/>
                </div>
                <h3></h3>
                <div>                    
                </div>
            </header>        
        </div>
</>
    );
}
export default BackHeader;