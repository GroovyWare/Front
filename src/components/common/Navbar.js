import { NavLink, useNavigate } from 'react-router-dom';
import NavbarCSS from '../common/Navbar.module.css';
import profileImg from './img/user.svg';
import { Link } from 'react-router-dom';
import arrow from './img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callGetUserAPI } from '../../api/LoginAPICalls';

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.loginReducer);

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        alert('로그아웃이 완료되었습니다.');
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

            <div className={ NavbarCSS.profileDiv }>
                <div className={ NavbarCSS.profileBox }>
                    <img src={ user.data.file.fileSavedName } alt={user.data?.file.fileSavedName} className= { NavbarCSS.profile }/>
                </div>
                    <div className={ NavbarCSS.userName }>{ user.empName }님</div>
                    <button
                        type='submit'
                        onClick={ onClickLogoutHandler }
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

export default Navbar;