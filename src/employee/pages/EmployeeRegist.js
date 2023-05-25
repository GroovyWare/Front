import { useNavigate } from 'react-router-dom';
import RegistCSS from './EmployeeRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import profileDefaultImage from '../../components/common/img/profile_default.svg'
import { useDispatch } from 'react-redux';
import { callEmployeeListAPI, callEmployeeRegistAPI } from '../../api/EmployeeAPICalls';

function EmployeeRegist() {

    const ImageInput = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');
    const [ checkedInputs, setCheckedInputs ] = useState([]);
    const [ form, setForm ] = useState({
        deptCode : "1",
        positionCode : "1",
    });

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

    const doubleCheck = (e) => {
        const result = dispatch(callEmployeeListAPI())
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        }) 
    }

    console.log('[EmployeeRegist] form ', form);

    const checkedHandler = (checked, value) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, value]);
          } else {
            setCheckedInputs(checkedInputs.filter((el) => el !== value));
          }
    }
    console.log(checkedInputs);

    const onClickEmployeeRegist = () => {
        const formData = new FormData();
        formData.append("empId", form.empId);
        formData.append("empPassword", form.empPassword);
        formData.append("empName", form.empName);
        formData.append("empPhone", form.empPhone);
        formData.append("empEmail", form.empEmail);
        formData.append("empAddress", form.empAddress);
        formData.append("dept.deptCode", form.deptCode);
        formData.append("position.positionCode", form.positionCode);
      
        checkedInputs.forEach((authCode, i) =>
             formData.append(`auths[${i}].empAuthPK.authCode`, authCode)
        )
        console.log(formData.get(`auths[0].empAuthPK.authCode`));
        console.log(formData.get(`auths[1].empAuthPK.authCode`));

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
                    { imageUrl && <img src={ imageUrl }/> }
                    { !imageUrl && <img src={ profileDefaultImage }/> }
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
                                    onChange={ onChangeHandler }
  
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>비밀번호</label></td>
                            <td>
                                <input
                                    type="password"
                                    name="empPassword"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>이름</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empName"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>휴대폰번호</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empPhone"
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>이메일</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="empEmail"
                                    onChange={ onChangeHandler }
                                />
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