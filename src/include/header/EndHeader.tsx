import BackArrowImg from "../../08_svg/BackArrowImg";
import ExitImg from "../../08_svg/ExitImg";
import HpTop2 from "../HpTop2";
import { useNavigate } from "react-router-dom";

const EndHeader = () => {
    const navigate = useNavigate();

    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
                <div onClick={() => navigate(-1)}>
                <BackArrowImg/>
                </div>
                <h3>풀이는 여기까지예요</h3>
                <div>
                <ExitImg/>
                </div>
            </header>        
        </div>
</>
    );
}
export default EndHeader;