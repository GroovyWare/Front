import { NavLink } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";


function Navbar(){

    const [hovered, setHovered] = useState(false);

    const styles = {
        default: {
            color:"white"
        },
        hovered: {
            backgroundColor: "#1A1779",
            color: "white",
        }
    }

    return(
        <div className={NavbarCSS.navbarDiv}>
            <div className={NavbarCSS.navbarUl}>
                <button>로그아웃</button>
                    <li style={{marginTop:40}}>일정관리</li>
                    <li>공지사항</li>
                    <li>시설관리</li>
                    <li>예약관리</li>
                    <li>회원관리</li>
                    <li><NavLink 
                        to="/approval" 
                        style={{textDecoration : "none"}}>
                            <div 
                                style={hovered ? styles.hovered : styles.default}
                                onClick={() => setHovered(true)}
                                onMouseOver={() => setHovered(false)}>결재</div></NavLink></li>
                    <li>운동량</li>
                    <div className={NavbarCSS.empDiv}>조직도</div>
            </div>
            
        </div>
    )
}

export default Navbar;