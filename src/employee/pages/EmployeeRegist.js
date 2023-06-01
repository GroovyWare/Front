import { useNavigate } from 'react-router-dom';
import RegistCSS from './EmployeeRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import profileDefaultImage from '../../components/common/img/profile_default.svg'
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeIdCheckAPI, callEmployeeRegistAPI } from '../../api/EmployeeAPICalls';
import { toast } from 'react-toastify';
import useInput from './UseInput';

function EmployeeRegist() {

    // 비밀번호 유효성 검사
    const passwordValidator = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!regex.test(value)) {
        return {
            isValid: false,
            error: '문자, 숫자, 특수문자를 포함한 최소 8자리 이상 입력해주세요.'
        };
        }
        return { isValid: true, success: '사용가능한 비밀번호입니다.' };
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


    const password = useInput('', passwordValidator);
    const passwordConfirm = useInput('', passwordConfirmValidator);
    const email = useInput('', emailValidator);
    const name = useInput('', nameValidator);
    const phone = useInput('', phoneValidator);

    // console.log('passwordConfrim', passwordConfirm.value)
    // console.log('name', name.value);
    // console.log('email', email.value);
    // console.log('phone', phone.value);


    const ImageInput = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.employeeReducer);
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');
    const [ checkedInputs, setCheckedInputs ] = useState([2]);
    const [ form, setForm ] = useState({
        empId : "",
        deptCode : "1",
        positionCode : "1",
    });

    const [ idCheck, setIdCheck ] = useState(false); 
    const { check } = useSelector(state => state.employeeReducer);
    const [ isClicked, setIsClicked ] = useState(false);
    console.log('isClicked', isClicked)

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
        if(form.empId.length === 0) {
            setIsClicked(false)
        } 
        },
        [form]
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
                    console.log('result : ' , result);
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
       dispatch(callEmployeeIdCheckAPI(form.empId));
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
        const formData = new FormData();
        formData.append("empId", form.empId);
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

        // console.log(formData.get(`auths[0].auth.authCode`));
        // console.log(formData.get(`auths[1].auth.authCode`));

        // for(let i=0; i < checkedInputs.length; i++) {
        //     formData.append(`auths[${i}].empAuthPK.authCode`, checkedInputs[i])
        //     console.log(formData.get(`auths[${i}].empAuthPK.authCode`));
        // }
        
        if(image) {
            formData.append("imgUrl", image);
        }

        dispatch(callEmployeeRegistAPI(formData)); 

    }

    return (
        <div className={ RegistCSS.container }>

            <div className={ RegistCSS.pageTitle }>
                <h3>직원등록</h3>
            </div>

            <div className={ RegistCSS.content }>              
                <div className={ RegistCSS.profileDiv }>
                    { imageUrl ? 
                     <img src={ imageUrl } alt=""/> : <img src={ profileDefaultImage } alt=""/> }
                    <input
                        className={ RegistCSS.imgInput }
                        type="file"
                        name="profileImage"
                        accept="image/jpg,image/png,image/jpeg"
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
                        <tr>
                            <td><label>아이디</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empId"
                                    value = { form.empId }
                                    onChange={ onChangeHandler }
                                />
                                <button onClick={ doubleCheck } disabled={ form.empId.length < 1 }>중복 확인</button>
                                {  isClicked && check ? <div>이미 사용 중인 아이디입니다.</div> 
                                  : form.empId.length > 0 && isClicked && !check ? <div>사용가능한 아이디입니다.</div>
                                  : null
                                }
                            </td>
                            
                        </tr>
                        <tr>
                            <td><label>비밀번호</label></td>
                            <td>
                                <input
                                    type="password"
                                    name="empPassword"
                                    value={password.value}
                                    onChange={password.onChange}
                                />
                                { password.value.length > 0 &&
                                  <div className={RegistCSS.message}>{password.message}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label>비밀번호 확인</label></td>
                            <td>
                                <input
                                    type="password"
                                    value={passwordConfirm.value}
                                    onChange={passwordConfirm.onChange}
                                />
                                { 
                                 passwordConfirm.value.length > 0 &&
                                <div className={RegistCSS.message}>{passwordConfirm.message}</div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td><label>이름</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empName"
                                    value={name.value}
                                    onChange={name.onChange}
                                />
                                { name.value.length > 0 &&
                                    <div className={RegistCSS.message}>{name.message}</div>}                            
                            </td>
                        </tr>
                        <tr>
                            <td><label>휴대폰번호</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empPhone"
                                    value={
                                        phone.value
                                    }
                                    onChange={phone.onChange}
                                />
                                { phone.value.length > 0 &&
                                    <div className={RegistCSS.message}>{phone.message}</div>} 
                            </td>
                        </tr>
                        <tr>
                            <td><label>이메일</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empEmail"
                                    value={email.value}
                                    onChange={email.onChange}
                                />
                                { email.value.length > 0 &&
                                    <div className={RegistCSS.message}>{email.message}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label>주소</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empAddress"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>부서</label></td>
                            <td>
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
                        <tr>
                            <td><label>직급</label></td>
                            <td>
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
                        <tr>
                            <td><label>권한</label></td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="1"
                                        onChange={(e)=>{
                                            checkedHandler(e.currentTarget.checked, 1)
                                          }}
                                          checked={checkedInputs.includes(1) ? true : false}
                                    />
                                관리자
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="2"
                                        onChange={(e)=>{
                                            checkedHandler(e.currentTarget.checked, 2)
                                          }}
                                          checked={checkedInputs.includes(2) ? true : false}
                                    />
                                일반
                                </label>
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

