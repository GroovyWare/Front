import { NavLink } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css";


function Navbar(){
    return(
        <div className={NavbarCSS.navbarDiv}>
            <div className={NavbarCSS.navbarUl}>
                <button>로그아웃</button>
                    <li style={{marginTop:40}}>일정관리</li>
                    <li>공지사항</li>
                    <li>시설관리</li>
                    <li>예약관리</li>
                    <li>회원관리</li>
                    <li><NavLink to="/approval">결재</NavLink></li>
                    <li>운동량</li>
                    <div className={NavbarCSS.empDiv}>조직도</div>
            </div>
            
        </div>
    )
}

export default Navbar;