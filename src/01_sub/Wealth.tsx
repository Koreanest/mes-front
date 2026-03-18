import Anatomy from "../include/Anatomy";
import Gnb from "../include/Gnb";
import Tab from "../include/Tab";
import HpTop from "../include/HpTop";

const Wealth = () => {
    return(
<>
   <div className="Min390Max">
    <HpTop/>
  <Anatomy/>
  <Gnb/>
  <Tab category="wealth"/>
   </div> 
</>
    );
}
export default Wealth;