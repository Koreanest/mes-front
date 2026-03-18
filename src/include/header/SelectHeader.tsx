import BackArrowImg from "../../08_svg/BackArrowImg";
import HpTop2 from "../HpTop2";

const SelectHeader = () => {
    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
                <a href="/">
                <BackArrowImg/>
                </a>
                <h3>사주 정보 선택</h3>
                <div>                    
                </div>
            </header>        
        </div>
</>
    );
}
export default SelectHeader;