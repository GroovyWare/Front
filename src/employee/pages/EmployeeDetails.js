import { useParams } from 'react-router-dom';
import empDetailsCSS from './EmployeeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeDetailsAPI } from '../../api/EmployeeAPICalls';
import { useEffect, useRef, useState } from 'react';

function EmployeeDetails({ setEmpDetailsOpen, emp }) {
    
    const ImageInput = useRef();    
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(emp.file.fileSavedName);
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
    }

    const onClickImageUpload = () => {
        ImageInput.current.click();
    }

    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }



    return (
        <div className={ empDetailsCSS.container }>

            <div className={ empDetailsCSS.modalHeader }>
                <div>직원 상세 정보</div>
                <button className={ empDetailsCSS.closeBtn } onClick={ closeEmpDetails }>
                    x
                </button>
            </div>

            <div className={ empDetailsCSS.modalBody }>
                <div className={ empDetailsCSS.profileDiv }>
                    <img src={ imageUrl }/>
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
                                name={ emp.empId }
                                value={ emp.empId }
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>패스워드</label></td>
                            <td>
                                <input
                                type="password"
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
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>휴대폰번호</label></td>
                            <td>
                                <input
                                type="number"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>이메일</label></td>
                            <td>
                                <input
                                type="text"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>주소</label></td>
                            <td>
                                <input
                                type="text"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>부서</label></td>
                            <td>
                                <input
                                type="text"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>직급</label></td>
                            <td>
                                <input
                                type="text"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>입사일</label></td>
                            <td>
                                <input
                                type="text"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>퇴사일</label></td>
                            <td>
                                <input
                                type="text"
                                onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        </table>
                    <div className={ empDetailsCSS.btn }>
                        <button>
                            수정완료
                        </button>
                        <button
                            onClick={ closeEmpDetails }
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div> {/* body end */}

        </div>
    )
}

  // <input                
                        //     style={ { display: 'none' }}
                        //     type="file"
                        //     name='productImage' 
                        //     accept='image/jpg,image/png,image/jpeg,image/gif'
                        //     ref={ ImageInput }
                        //     onChange={ onChangeImageUpload }
                        // />

export default EmployeeDetails;