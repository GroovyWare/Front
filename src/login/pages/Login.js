import LoginCSS from './Login.module.css';
import logo from '../img/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callLoginAPI } from '../../api/LoginAPICalls';
import { useNavigate } from 'react-router';
import { resetEmp } from '../../modules/LoginModule';
import { toast } from 'react-toastify';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ form, setForm ] = useState({
        empId: '',
        empPassword: ''
    });

    const { login } = useSelector(state => state.loginReducer);

    useEffect(
        () => {
            if(login?.status === 200) {
                navigate("/", { replace : true });
                dispatch(resetEmp());
            } else if(login?.state === 400) {
                toast.warning(login.message);
                dispatch(resetEmp());
            }
        },
        [login]
    )

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickHandler = () => {
        dispatch(callLoginAPI(form));
    }

    const onKeyDownHandler= (e) => {
        if(e.key === 'Enter')
        dispatch(callLoginAPI(form));
    }

    return (
        <div className={ LoginCSS.container }>
        <div className={ LoginCSS.loginBg }> 
            <div className={ LoginCSS.logoDiv }>
                <img src={ logo } alt="로고" className={ LoginCSS.logo }></img>
                <div className={ LoginCSS.text1 }>GROOVY</div>
                <div className={ LoginCSS.text2 }>GROUPWARE</div>
            </div>
            <div>
                <input
                    type="text"
                    name="empId"
                    placeholder="아이디"
                    className={ LoginCSS.loginForm }
                    onChange={ onChangeHandler }
                    onKeyDown={ onKeyDownHandler }
                /><br/>
                <input
                    type="password"
                    name="empPassword"
                    placeholder="비밀번호"
                    autoComplete="off"
                    className={ LoginCSS.loginForm }
                    onChange={ onChangeHandler }
                    onKeyDown={ onKeyDownHandler }
                />
            </div>
            <div >
                <button 
                    type="button"
                    className={ LoginCSS.loginBtn }
                    onClick={ onClickHandler }    

                >
                로그인
                </button>
            </div>
        </div>
        </div>
    )
}

export default Login;