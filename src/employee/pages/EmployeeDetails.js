import { useParams } from 'react-router-dom';
import empDetailsCSS from './EmployeeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeDetailsAPI } from '../../api/EmployeeAPICalls';
import { useEffect, useRef, useState } from 'react';
import  profileDefaultImage  from '../../components/common/img/profile_default.svg';
import DaumPostcode from 'react-daum-postcode';

function EmployeeDetails({ setEmpDetailsOpen, emp }) {
    
    const ImageInput = useRef();    
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(emp.file?.fileSavedName);
    const [ form, setForm ] = useState(emp);

    const closeEmpDetails = () => {
        setEmpDetailsOpen(false);
    };

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
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        console.log(form);
    }

    const onClickImageUpload = () => {
        ImageInput.current.click();
    }

    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }


    return (
    <div className={ empDetailsCSS.modal }>
        <div className={ empDetailsCSS.container }>

            <div className={ empDetailsCSS.modalHeader }>
                <h3 className={ empDetailsCSS.modalTitle }>직원 상세 정보</h3>
            </div>

            <div className={ empDetailsCSS.modalBody }>
                <div className={ empDetailsCSS.profileDiv }>
                    { imageUrl && <img src={ imageUrl }/> }
                    { !imageUrl && <img src={ profileDefaultImage }/> }
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
                <div className={ empDetailsCSS.userInfo }>
                    <table>
                        <tr>
                            <td><label>아이디</label></td>
                            <td>
                                <input
                                type="text"
                                name="emp.empId"
                                value={ emp.empId }
                                onChange={ onChangeHandler }
                                readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>패스워드</label></td>
                            <td>
                                <input
                                type="password"
                                value={ emp.empPassword }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>이름</label></td>
                            <td>
                                <input
                                type="text"
                                value={ emp.empName }
                                readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>휴대폰번호</label></td>
                            <td>
                                <input
                                type="text"
                                defaultValue={ emp.empPhone }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>이메일</label></td>
                            <td>
                                <input
                                type="email"
                                defaultValue={ emp.empEmail }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>주소</label></td>
                            <td>
                                <input
                                type="text"
                                name="emp.empAddress"
                                defaultValue={ emp.empAddress }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>입사일</label></td>
                            <td>
                                <input
                                type="text"
                                name="emp.empEntDate"
                                defaultValue={ emp.empEntDate }
                                onChange={ onChangeHandler }
                                readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>부서</label></td>
                            <td>
                                <select 
                                    name="emp.dept.deptCode"
                                    value={ emp.dept.deptCode }>
                                    <option value="1">관리</option>
                                    <option value="2">피트니스</option>
                                    <option value="3">필라테스</option>
                                    <option value="4">GX</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>직급</label></td>
                            <td>
                                <select 
                                    name="emp.position.positionCode"
                                    value={ emp.position.positionCode }>
                                    <option value="1">대표</option>
                                    <option value="2">팀매니저</option>
                                    <option value="3">시니어</option>
                                    <option value="4">일반</option>
                                </select>
                            </td>
                        </tr>

                        </table>
                    <div className={ empDetailsCSS.btn }>
                        <button>
                            수정
                        </button>
                        <button
                            onClick={ closeEmpDetails }
                        >
                            취소
                        </button>


                    </div>
                </div>
            </div> {/* modalbody end */}

        </div>
    </div>
    )
}


export default EmployeeDetails;