import { NavLink } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";
import Accordion from "../../Approval/common/ApvArcodian";


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
                    <li style={{marginTop:40}}><NavLink 
                        to="" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                             <Accordion title="일정관리">
                                <div className={NavbarCSS.linkto}>회수함</div>
                                <div className={NavbarCSS.linkto}>종결함</div>
                                <div className={NavbarCSS.linkto}>반려함</div>
                            </Accordion>
                    </NavLink></li>
                    <li><NavLink 
                        to="/announce" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                            공지사항
                    </NavLink></li>
                    <li><NavLink 
                        to="" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                             <Accordion title="시설관리">
                                <div className={NavbarCSS.linkto}>회수함</div>
                                <div className={NavbarCSS.linkto}>종결함</div>
                                <div className={NavbarCSS.linkto}>반려함</div>
                            </Accordion>
                    </NavLink></li>
                    <li><NavLink 
                        to="/member" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                             <Accordion title="회원관리">
                                <div className={NavbarCSS.linkto}>
                                <NavLink to="/member/regist" style={{textDecoration : "none", color : "white"}}>회원등록</NavLink></div>
                                <div className={NavbarCSS.linkto}>
                                <NavLink to="/member/pass" style={{textDecoration : "none", color : "white"}}>회원권</NavLink></div>
                            </Accordion>
                    </NavLink></li>
                    <li><NavLink 
                        to="/approval" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                             <Accordion title="결재">
                                <div className={NavbarCSS.linkto}>회수함</div>
                                <div className={NavbarCSS.linkto}>종결함</div>
                                <div className={NavbarCSS.linkto}>반려함</div>
                            </Accordion>
                    </NavLink></li>
                    <li><NavLink 
                        to="/play" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                             <Accordion title="운동량">
                                <div className={NavbarCSS.linkto}>
                                    <NavLink to="/play/history" style={{textDecoration : "none", color : "white"}}>운동 이력 조회</NavLink></div>
                            </Accordion>
                    </NavLink></li>

                    <div className={NavbarCSS.empDiv}>조직도</div>
            </div>
            
        </div>
    )
}

export default Navbar;