import HpTop2 from "../HpTop2";
import ExitImg from "../../08_svg/ExitImg";

const DesHeader = () => {
    return(
<>
        <div className="detail-header">
            <HpTop2 />
            <header className="">
                <a href="/"></a>
                <h3>상세  풀이</h3>
                <div>
                <ExitImg/>
                </div>
            </header>        
        </div>
</>
    );
}
export default DesHeader;