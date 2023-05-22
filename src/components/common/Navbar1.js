import { NavLink } from 'react-router-dom';
import NavbarCSS from '../common/Navbar1.module.css';
import profileImg from './user.svg';
import { Link } from 'react-router-dom';
import arrow from './img/arrow.svg';

function Navbar1() {

    return (
        <div className={ NavbarCSS.container }>
            <div className={ NavbarCSS.profileDiv }>
                <div className={ NavbarCSS.profileBox }>
                    <img src={ profileImg } alt={ profileImg } className= { NavbarCSS.profile }></img>
                </div>
                    <div className={ NavbarCSS.userName }>Groovy님</div>
                    <button
                        className={ NavbarCSS.logoutBtn }
                    >로그아웃</button>
            </div>
            <div className={ NavbarCSS.navDiv }>
                <ul className={ NavbarCSS.menu }>

                        <li><NavLink to="/schedule" className={ NavbarCSS.link }>
                            일정관리
                            <img src={ arrow } className = { NavbarCSS.arrowYes }/>
                            <ul className={ NavbarCSS.subMenu }>
                                <li><NavLink to="/" className={ NavbarCSS.link }>캘린더</NavLink></li>
                                <li><NavLink to="/" className={ NavbarCSS.link }>근태</NavLink></li>
                            </ul>
                            </NavLink>
                        </li>

 
                        <li><NavLink to="/" className={ NavbarCSS.link }>
                            공지사항
                            <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                            </NavLink>
                        </li>


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
                </ul>
            </div>
        </div>

    )
}

export default Navbar1;