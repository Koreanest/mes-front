import ExitImg from "../../08_svg/ExitImg";
import HpTop2 from "../HpTop2";

const FreeDetailHeader =() => {
    return(
<>
   <div className="detail-header">
        <HpTop2 />
        <header className="">
            <div className=""></div>
            <h3 className="detail-h3">상세풀이</h3>
            <div className="">
                <ExitImg/>
            </div>
        </header>
    </div>
</>
    );
}
export default FreeDetailHeader