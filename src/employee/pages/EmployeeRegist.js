import { useNavigate } from 'react-router-dom';
import RegistCSS from './EmployeeRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import profileDefaultImage from '../../components/common/img/profile_default.svg'
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeIdCheckAPI, callEmployeeRegistAPI } from '../../api/EmployeeAPICalls';
import { toast } from 'react-toastify';
import useInput from './UseInput';

function EmployeeRegist() {

    // 아이디 유효성 검사
    const idValidator = (value) => {
        var regex = /^(?=.*[a-z0-9])[a-z0-9]{6,20}$/; 
        if (!regex.test(value)) {
        return {
            isValid: false,
            error: '영소문자, 숫자를 포함한 6~20자리 사이 값을 입력해주세요'
        };
        }
        return { isValid: true, success: '' }; ;
    };


    // 비밀번호 유효성 검사
    const passwordValidator = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!regex.test(value)) {
        return {
            isValid: false,
            error: '문자, 숫자, 특수문자를 포함한 최소 8자리 이상 입력해주세요.',
        };
        }
        return { isValid: true, success: '사용가능한 비밀번호입니다.' }; ;
    };

    // 비밀번호 일치 여부
    const passwordConfirmValidator = (value) => {
        if(value !== password.value) {
        return {
            isValid: false,
            error: '비밀번호가 일치하지 않습니다.'
        };
        }
        return { isValid: true, success: '비밀번호가 일치합니다.', };
    };

    // 이름 유효성 검사
    const nameValidator = (value) => {
        const regex = /^[가-힣]{2,5}$/;
        if (!regex.test(value)) {
        return {
            isValid: false,
            error: '한글 2~5자만 가능합니다.'
        };
        }
        return { isValid: true, success: '사용가능한 이름입니다.' };
    };
    // 휴대폰 유효성 검사
    const phoneValidator = (value) => {
        const regex =  /^\d{3}\d{3,4}\d{4}$/;
        if (!regex.test(value)) {
        return {
            isValid: false,
            error: "'-'를 제외하고 입력해주세요"
        };
        }
        return { isValid: true, success: '사용가능한 전화번호입니다.' };
    };

    // 이메일 유효성 검사
    const emailValidator = (value) => {
        const regex =  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if (!regex.test(value)) {
        return {
            isValid: false,
            error: '유효한 이메일 형식이 아닙니다.'
        };
        }
        return { isValid: true, success: '사용가능한 이메일입니다.' };
    };

    const ImageInput = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.employeeReducer);
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');
    const [ checkedInputs, setCheckedInputs ] = useState([2]);
    const [ form, setForm ] = useState({
        deptCode : "1",
        positionCode : "1",
    });

    const userId = useInput('', idValidator);
    const password = useInput('', passwordValidator);
    const passwordConfirm = useInput('', passwordConfirmValidator);
    const email = useInput('', emailValidator);
    const name = useInput('', nameValidator);
    const phone = useInput('', phoneValidator);

    const [ idCheck, setIdCheck ] = useState(false); 
    const { check } = useSelector(state => state.employeeReducer);
    const [ isClicked, setIsClicked ] = useState(false);

    const deptSelectList = [
        { value: "1", name: "관리" },
        { value: "2", name: "피트니스" },
        { value: "3", name: "필라테스" },
        { value: "4", name: "GX" },
    ]

    const positionSelectList = [
        { value: "1", name: "대표" },
        { value: "2", name: "팀매니저" },
        { value: "3", name: "시니어" },
        { value: "4", name: "일반" },
    ]

    useEffect(
        () => {
        if(userId.value.length === 0) {
            setIsClicked(false)
        } 
        },
        [userId]
    )

    useEffect(
        () => {
            check ? setIdCheck(true) : setIdCheck(false); // 아이디 중복여부
            
        },
        [check]
    )
    
    useEffect(
        () => {
            if(regist?.status === 200) {
                toast.success('등록이 완료되었습니다.!');
                navigate(-1);
            }
        },
        [regist]
    )

    useEffect(
        () => {
            if(image) {
                 const fileReader = new FileReader();
                 fileReader.onload = (e) => {
                    
                    const { result } = e.target;

                    if(result) setImageUrl(result);
                 }
                 fileReader.readAsDataURL(image);
            }
        },
        [image]
    )

    /* 이미지 업로드 */
    const onClickImageUpload = () => {
        ImageInput.current.click();
    }

    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    const doubleCheck = () => {
       dispatch(callEmployeeIdCheckAPI(userId.value));
       setIsClicked(true);
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        }) 
    }

    const checkedHandler = (checked, value) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, value]);
          } else {
            setCheckedInputs(checkedInputs.filter((el) => el !== value));
          }
    }

    const onClickEmployeeRegist = () => {

        if(!userId.isValid) {
            toast.error('아이디를 다시 입력해주세요 !')
        } else if(idCheck) {
            toast.error('아이디를 확인해주세요 !');
            return;
        } else if(!password.isValid) {
            toast.error('비밀번호를 다시 입력해주세요 !');
            return;
        } else if(!passwordConfirm.isValid) {
            toast.error('비밀번호가 일치하지 않습니다 !');
            return;
        } else if(!name.isValid) {
            toast.error('이름을 다시 입력해주세요 !');
            return;
        }  else if(!email.isValid) {
            toast.error('이메일을 다시 입력해주세요 !');
            return;
        }  else if(!phone.isValid) {
            toast.error('연락처를 다시 입력해주세요 !');
            return;
        }

        const formData = new FormData();
        formData.append("empId", userId.value);
        formData.append("empPassword", passwordConfirm.value);
        formData.append("empName", name.value);
        formData.append("empPhone", phone.value);
        formData.append("empEmail", email.value);
        formData.append("empAddress", form.empAddress);
        formData.append("dept.deptCode", form.deptCode);
        formData.append("position.positionCode", form.positionCode);
      
        checkedInputs.forEach((authCode, i) =>
             formData.append(`auths[${i}].auth.authCode`, authCode)
        )

        
        if(image) {
            formData.append("imgUrl", image);
        }

        dispatch(callEmployeeRegistAPI(formData)); 

    }

    return (
        <div className={ RegistCSS.container }>

            <div className={ RegistCSS.pageTitle }>
                <div>직원등록</div>
            </div>

            <div className={ RegistCSS.content }>
                
                <div className={ RegistCSS.profileDiv }>
                    { imageUrl ? 
                     <img src={ imageUrl } alt=""/> : <img src={ profileDefaultImage } alt=""/> }
                    <input
                        className={ RegistCSS.imgInput }
                        type="file"
                        name="profileImage"
                        accept="image/jpg,image/png,image/jpeg"x    
                        ref={ ImageInput }
                        onChange={ onChangeImageUpload }
                    />
                    <button onClick={ onClickImageUpload }>  
                        사진 첨부
                    </button>
                </div>
                <div className={ RegistCSS.empInfo }>
                <table>
                    <tbody>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>아이디</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="empId"
                                    value={userId.value}
                                    onChange={userId.onChange}
                                />
                                <button className={ RegistCSS.checkBtn } onClick={ doubleCheck } disabled={ userId.value.length < 1 }>중복 확인</button><br/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {  userId.value.length > 0 && !userId.isValid ? <div className={RegistCSS.message}>{userId.message}</div> :
                                    isClicked && check ? <div className={RegistCSS.message}>이미 사용 중인 아이디입니다.</div> 
                                  :  userId.value.length > 0 && isClicked && !check ? <div className={RegistCSS.message}>사용가능한 아이디입니다.</div>
                                  :  null
                                }
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>비밀번호</label></th>
                            <td>
                                <input
                                    type="password"
                                    name="empPassword"
                                    value={password.value}
                                    onChange={password.onChange}
                                />              
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            { password.value.length > 0 &&
                                  <div className={ RegistCSS.message }>{password.message}</div>}
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>비밀번호 확인</label></th>
                            <td>
                                <input
                                    type="password"
                                    value={passwordConfirm.value}
                                    onChange={passwordConfirm.onChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            { 
                                 passwordConfirm.value.length > 0 &&
                                <div className={RegistCSS.message}>{passwordConfirm.message}</div>
                                }
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>이름</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="empName"
                                    value={name.value}
                                    onChange={name.onChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                { name.value.length > 0 &&
                                    <div className={RegistCSS.message}>{name.message}</div>}                            
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>휴대폰번호</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="empPhone"
                                    value={
                                        phone.value
                                    }
                                    onChange={phone.onChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            { phone.value.length > 0 &&
                                    <div className={RegistCSS.message}>{phone.message}</div>} 
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>이메일</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="empEmail"
                                    value={email.value}
                                    onChange={email.onChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            { email.value.length > 0 &&
                                    <div className={RegistCSS.message}>{email.message}</div>}
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>주소</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="empAddress"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>부서</label></th>
                            <td className={ RegistCSS.selectDiv}>
                                <select
                                name="deptCode"
                                onChange={ onChangeHandler }>
                                    {deptSelectList.map(item => {
                                        return (
                                        <option value={item.value} key={item.value}>
                                            {item.name}
                                        </option>
                                        )
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>직급</label></th>
                            <td className={ RegistCSS.selectDiv}>
                                <select 
                                    name="positionCode"
                                    onChange={ onChangeHandler }
                                >
                                    {positionSelectList.map(item => {
                                        return <option value={item.value} key={item.value}>
                                            {item.name}
                                        </option>
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr className={ RegistCSS.row}>
                            <th className={RegistCSS.inputTitle}><label>권한</label></th>
                            <td className={ RegistCSS.checkboxDiv }>
                                <input
                                    type="checkbox"
                                    id="checkbox1"
                                    value="1"
                                    onChange={(e)=>{
                                        checkedHandler(e.currentTarget.checked, 1)
                                        }}
                                        checked={checkedInputs.includes(1) ? true : false}
                                />
                                <label for="checkbox1">관리자</label>
                                <input
                                    type="checkbox"
                                    id="checkbox2"
                                    value="2"
                                    onChange={(e)=>{
                                        checkedHandler(e.currentTarget.checked, 2)
                                        }}
                                        checked={checkedInputs.includes(2) ? true : false}
                                />
                                <label for="checkbox2">일반</label>
                            </td>
                        </tr>
                    </tbody>
                    </table>      
                </div>


            </div>  {/* content 끝 */}
            <div className={ RegistCSS.btn }>
                <button onClick={ onClickEmployeeRegist }>등록</button>
                <button onClick={ () => navigate(-1) }>취소</button>
            </div>
        </div>
    )
}

export default EmployeeRegist;

