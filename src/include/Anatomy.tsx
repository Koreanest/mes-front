import Logo from "./Logo";
import Person from "./Person";
import { Link } from "react-router-dom";

function Anatomy(){
    return(
<>
<header className="header">
<div className="logo">
<Link to="/">
<Logo/>
</Link>
</div>
<div className="person">
<Link to="/flogin">
<Person/>
</Link>
</div>
{/*<div className="person">
<Link to="/not">
<Person/>
</Link>
</div>*/}
</header>
</>        
    );
}
export default Anatomy;