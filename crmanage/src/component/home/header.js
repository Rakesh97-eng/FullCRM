import { Link } from "react-router-dom";
import './header.css'
import SimpleDialogDemo from "../profile/profile";

const Header = ()=>{

return(
    <>
    
    <div className="taskheader">
      <div>Welcome!</div>
      {/* <div onClick={}>profile</div> */}
    <SimpleDialogDemo/>
    </div>
    </>
)
}

export default Header;