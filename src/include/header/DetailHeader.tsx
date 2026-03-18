import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";
import HouseImg from "../../08_svg/HouseImg";
import { useNavigate } from "react-router-dom";

const DetailHeader = () => {
    const navigate = useNavigate();
    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
              <div onClick={() => navigate(-1)}>
                <BackArrowImg/>
               </div>
                <h3 className="detail-h3">바람으로 끝날 인연일까, 진짜 사랑일까?</h3>
                <div>
                    <HouseImg/>
                </div>
            </header>        
        </div>
</>
    );
}
export default DetailHeader;