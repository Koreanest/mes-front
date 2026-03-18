import { useNavigate } from "react-router-dom";
import HpTop2 from "../HpTop2";
import ExitImg from "../../08_svg/ExitImg";
import BackArrowImg from "../../08_svg/BackArrowImg";

const QuitHeader = () => {
    const navigate = useNavigate();

    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
                    <div onClick={() => navigate(-1)} className="back-btn">
                        <BackArrowImg/>
                    </div>
                <h3>풀이중</h3>
                <div>
                <ExitImg/>
                </div>
            </header>        
        </div>
</>
    );
}
export default QuitHeader;