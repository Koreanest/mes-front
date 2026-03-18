import Anatomy from "../include/Anatomy";
import Gnb from "../include/Gnb";
import HpTop from "../include/HpTop";
import Tab from "../include/Tab";

const Romantic = () => {
    return(
<>
   <div className="Min390Max">
    <HpTop/>
  <Anatomy/>
  <Gnb/>
  <Tab category="romantic"/>
   </div> 
</>
    );
}
export default Romantic;