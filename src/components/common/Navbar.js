import { NavLink, useNavigate } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";
import Accordion from "../../Approval/common/ApvArcodian";


function Navbar(){

    const navigate = useNavigate();

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

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        navigate('/login', { replace : true });
    
    }

    return(
        <div className={NavbarCSS.navbarDiv}>
            <div className={NavbarCSS.navbarUl}>
                <button
                    className={NavbarCSS.logoutBtn}
                    onClick={ onClickLogoutHandler }
                >로그아웃</button>
                    <li style={{marginTop:40}}><NavLink 
                        to="/schedule" 
                        style={{textDecoration : "none", textAlign : "center", color:'white'}}>
                             <Accordion title="일정관리">
                                <div className={NavbarCSS.linkto}>캘린더</div>
                                <div className={NavbarCSS.linkto}>근태</div>
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
                                <NavLink to="/pass" style={{textDecoration : "none", color : "white"}}>회원권</NavLink></div>
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



                    <li><NavLink to="/" className={ NavbarCSS.link }>
                        시설관리
                        <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                        </NavLink>
                    </li>

                    <li><NavLink to="/member" className={ NavbarCSS.link }>
                        회원관리
                        <img src={ arrow } className = { NavbarCSS.arrowYes }/>
                            <ul className={ NavbarCSS.subMenu }>
                                    <li><NavLink to="/member/regist" className={ NavbarCSS.link }>회원등록</NavLink></li>
                                    <li><NavLink to="/pass" className={ NavbarCSS.link }>회원권</NavLink></li>
                            </ul>
                        </NavLink>
                    </li>

                    <li><NavLink to="/approval" className={ NavbarCSS.link }>     
                        결재
                        <img src={ arrow } className = { NavbarCSS.arrowYes }/>
                            <ul className={ NavbarCSS.subMenu }>
                                    <li>회수함</li>
                                    <li>종결함</li>
                                    <li>반려함</li>
                            </ul>
                        </NavLink>
                    </li>
                        
                    <li><NavLink to="/approval" className={ NavbarCSS.link }>
                        운동량
                        <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                        </NavLink>
                    </li>

                    <li><Link to="/employee" className={ NavbarCSS.link }>
                        직원관리
                        <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                        </Link>
                    </li>


            </div>
            
        </div>
    )
}

export default Navbar;