import empDetailsCSS from './EmployeeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmplopyeeUpdateAPI, callEmployeeListAPI } from '../../api/EmployeeAPICalls';
import { useEffect, useRef, useState } from 'react';
import  profileDefaultImage  from '../../components/common/img/profile_default.svg';
import { toast } from 'react-toastify';
import { initEmployee } from '../../modules/EmployeeModule'

function EmployeeDetails({ setEmpDetailsOpen, emp }) {

    const dispatch = useDispatch();
    const ImageInput = useRef();    
    const { update } = useSelector(state => state.employeeReducer);

    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(emp.file?.fileSavedName);
    const [ checkedInputs, setCheckedInputs ] = useState([]);
    const [ form, setForm ] = useState(emp);

    console.log('checkedInputs', checkedInputs);

    const deptSelectList = [
        { value : "", name : "선택"},
        { value: "1", name: "관리" },
        { value: "2", name: "피트니스" },
        { value: "3", name: "필라테스" },
        { value: "4", name: "GX" },
    ]

    const positionSelectList = [
        { value: "", name : "선택" },
        { value: "1", name: "대표" },
        { value: "2", name: "팀매니저" },
        { value: "3", name: "시니어" },
        { value: "4", name: "일반" },
    ]

    useEffect(
        () => {
            const tempArr = [];
            emp.auths.forEach((auth) => {tempArr.push(auth.auth.authCode)});
            console.log('tempArr', tempArr);
            setCheckedInputs(tempArr);
            // emp.auths.forEach(auth => 
            //     setCheckedInputs([...checkedInputs, auth.empAuthPK.authCode]))
        },                           
        []
    )

    useEffect(
        () => { 
            if(update?.status === 200) {
                setEmpDetailsOpen(false);
                toast.success('정보 수정이 완료되었습니다.!');
                dispatch(initEmployee());
                dispatch(callEmployeeListAPI(1));
            }
        },
        [update]
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



    const closeEmpDetails = () => {
        setEmpDetailsOpen(false);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    console.log(form);

    const onClickImageUpload = () => {
        ImageInput.current.click();
    }

    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    const checkedHandler = (checked, value) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, value]);
          } else {
            setCheckedInputs(checkedInputs.filter((element) => element !== value));
          }
    }

    const onClickEmployeeUpdate = () => {
        const formData = new FormData();
        formData.append("empCode", form.empCode);
        formData.append("empId", form.empId);
        formData.append("empPassword", form.empPassword);
        formData.append("empName", form.empName);
        formData.append("empPhone", form.empPhone);
        formData.append("empEmail", form.empEmail);
        formData.append("empAddress", form.empAddress);
        formData.append("empEntDate", new Date(form.empEntDate));
        formData.append("dept.deptCode", form.dept.deptCode);
        formData.append("position.positionCode", form.position.positionCode);
      
        checkedInputs.forEach((authCode, i) =>
             formData.append(`auths[${i}].auth.authCode`, authCode)
        )

        console.log('0번 권한', formData.get(`auths[0].authCode`));
        console.log('1번 권한', formData.get(`auths[1].authCode`));

        // for(let i=0; i < checkedInputs.length; i++) {
        //     formData.append(`auths[${i}].empAuthPK.authCode`, checkedInputs[i])
        //     console.log('체크박스 값', formData.get(`auths[${i}].empAuthPK.authCode`));
        // }
        
        if(image) {
            formData.append("imgUrl", image);
        }

        dispatch(callEmplopyeeUpdateAPI(formData));

    }

    const deptHandler =(e) => {
        setForm({
            ...form,
            dept : { deptCode : e.target.value }     
        })
    }

    const positionHandler =(e) => {
        setForm({
            ...form,     
            position : { positionCode : e.target.value }
        })
    }

    return (
    <div className={ empDetailsCSS.modal }>
        <div className={ empDetailsCSS.container }>

            <div className={ empDetailsCSS.pageTitle }>
                <div>직원 상세 정보</div>
            </div>

            <div className={ empDetailsCSS.content }>
                <div className={ empDetailsCSS.profileDiv }>
                    { imageUrl ? 
                    <img src={ imageUrl } alt=""/> : <img src={ profileDefaultImage } alt=""/> }
                    <input
                        className={ empDetailsCSS.imgInput }
                        type="file"
                        name="profileImage"
                        accept="image/jpg,image/png,image/jpeg"
                        ref={ ImageInput }
                        onChange={ onChangeImageUpload }
                    />
                <button
                    onClick={ onClickImageUpload }
                >
                    사진 첨부
                </button>
                </div>    
                <div className={ empDetailsCSS.empInfo }>
                    <table>
                      <tbody>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>아이디</label></th>
                            <td>
                                <input
                                    type="text"
                                    value={ emp.empId }
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>패스워드</label></th>
                            <td>
                                <input
                                type="password"
                                value={ form.empPassword }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>이름</label></th>
                            <td>
                                <input
                                type="text"
                                value={ emp.empName }
                                readOnly
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>휴대폰번호</label></th>
                            <td>
                                <input
                                type="text"
                                name="empPhone"
                                value={ form.empPhone }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>이메일</label></th>
                            <td>
                                <input
                                type="email"
                                name="empEmail"
                                value={ form.empEmail }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>주소</label></th>
                            <td>
                                <input
                                type="text"
                                name="empAddress"
                                value={ form.empAddress }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>입사일</label></th>
                            <td>
                                <input
                                type="date"
                                name="empEntDate"
                                value={ form.empEntDate }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>부서</label></th>
                            <td className={ empDetailsCSS.selectDiv}>
                                <select
                                name="deptCode"
                                value ={ form.dept.deptCode }
                                onChange={ deptHandler }>
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
                        <tr className={ empDetailsCSS.row }>
                            <th className={empDetailsCSS.inputTitle}><label>직급</label></th>
                            <td className={ empDetailsCSS.selectDiv}>
                                <select 
                                    name="positionCode"
                                    value ={ form.position.positionCode }
                                    onChange={ positionHandler }
                                >
                                    {positionSelectList.map(item => {
                                        return <option value={item.value} key={item.value}>
                                            {item.name}
                                        </option>
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr className={ empDetailsCSS.row }>           
                        <th className={empDetailsCSS.inputTitle}><label>권한</label></th>
                        <td className={ empDetailsCSS.checkboxDiv }>
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
                 </div>

                <div className={ empDetailsCSS.btn }>
                    <button onClick={ onClickEmployeeUpdate }>수정</button>
                    <button onClick={ closeEmpDetails }>취소</button>
                </div>
            </div>
        </div>
    )
}


export default EmployeeDetails;