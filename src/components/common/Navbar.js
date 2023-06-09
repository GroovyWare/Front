import { NavLink, useNavigate } from 'react-router-dom';
import NavbarCSS from '../common/Navbar.module.css';
import profileImg from './img/profile_default.svg';
import { Link } from 'react-router-dom';
import arrow from './img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callGetUserAPI } from '../../api/LoginAPICalls';
import { toast } from 'react-toastify';

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.loginReducer);

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        toast.success('로그아웃이 완료되었습니다.');
        navigate('/login', { replace : true });
    }

    useEffect(
        () => {
            dispatch(callGetUserAPI());
        },
        []
    );

    return (
        <div className={ NavbarCSS.container }>
            { user &&   
            <div className={ NavbarCSS.profileDiv }>
                
                <div className={ NavbarCSS.profileBox }>
                { user.data.file !== null &&
                    <img src={ user.data?.file.fileSavedName } alt="프로필" className= { NavbarCSS.profile }/>
                }
                { user.data.file === null &&
                    <img src={ profileImg } alt="프로필" className= { NavbarCSS.profile }/>
                }
                </div>
                    <div className={ NavbarCSS.userName }>{ user.data.dept.deptTitle }팀&nbsp;{ user.data.empName }&nbsp;</div>
                
                    <button
                        onClick={ onClickLogoutHandler }
                        className={ NavbarCSS.logoutBtn }
                    >로그아웃</button>
            </div>
            }

            <div className={ NavbarCSS.navDiv }>
                <ul className={ NavbarCSS.menu }>

                        <li><NavLink to="/schedule" className={ NavbarCSS.link }>
                            일정관리
                            <img src={ arrow } className = { NavbarCSS.arrowYes }/>
                            <ul className={ NavbarCSS.subMenu }>
                                <li><NavLink to="/schedule" className={ NavbarCSS.link }>캘린더</NavLink></li>
                                <li><NavLink to="/attendance" className={ NavbarCSS.link }>근태</NavLink></li>
                            </ul>
                            </NavLink>
                        </li>

 
                        <li><NavLink to="/announce" className={ NavbarCSS.link }>
                            공지사항
                            <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                            </NavLink>
                        </li>

                        <li><NavLink to="/equipment" className={ NavbarCSS.link }>
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

                                    <li><Link to="/approval/add" className={NavbarCSS.link}>결재 양식 추가</Link></li>
                                    <li><Link to="/approval/request" className={NavbarCSS.link}>결재 요청</Link></li>
                                    <li><Link to="/approval/wait" className={NavbarCSS.link}>결재 대기</Link></li>
                                    <li><Link to="/approval/confirm" className={NavbarCSS.link}>종결함</Link></li>
                                    <li><Link to="approval/no" className={NavbarCSS.link}>반려함</Link></li>
                            </ul>
                        </NavLink>
                    </li>
                        
                    {/* <li><NavLink to="/play" className={ NavbarCSS.link }>
                        운동량
                        <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                        </NavLink>
                    </li> */}

                    {/* <li><Link to="/employee" className={ NavbarCSS.link }>
                        직원관리
                        <img src={ arrow } className = { NavbarCSS.arrowNo }/>
                        </Link>
                    </li> */}

                    <li><NavLink to="/employee" className={ NavbarCSS.link }>
                        직원관리
                        {/* <img src={ arrow } className = { NavbarCSS.arrowYes }/>
                            <ul className={ NavbarCSS.subMenu }>
                                    <li><NavLink to="/attendance/list" className={ NavbarCSS.link }>근태관리</NavLink></li>
                            </ul> */}
                        </NavLink>
                    </li>





                </ul>
            </div>
        </div>

    )
}

export default Navbar;