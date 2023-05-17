import { useEffect, useState } from 'react';
import ApvEmployeeCSS from './ApvEmployee.module.css';
import Head from '../pages/employeeList/Head';
import SelectReader from "../pages/person/SelectReader";
import SelectApprove from "../pages/person/SelectApprove";
import { useDispatch, useSelector } from 'react-redux';
import { searchEmployeeList, selectEmployeeList, searchDepartmentList } from '../../api/ApprovalAPICall';


function ApvEmployee({setModalOpen}){

    const [empName, setEmpName] = useState('');

    const dispatch = useDispatch();

    const closeModal = () => {
        setModalOpen(false);
    }

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            setEmpName(e.target.value);
        }
    }

    useEffect(
        () => {
            if(empName){
                dispatch(searchEmployeeList({empName}));
            }else{
                dispatch(selectEmployeeList());
            }
        }, [empName]
    )

    useEffect(
        () => {
            dispatch(searchDepartmentList());
        }
    )

    return(
        <div className={ApvEmployeeCSS.container}>
            <div className={ApvEmployeeCSS.wrap}>
                    <div className={ApvEmployeeCSS.emp}>
                        <input
                            type="text"
                            placeholder='이름'
                            className={ApvEmployeeCSS.textbox}
                            onKeyPress={onKeyPressHandler}
                        />
                        <div>
                            <Head empName = {empName}/>
                        </div>
                    </div>
                        <div>
                            <SelectApprove/>
                            <SelectReader/>

                            <button 
                                className={ApvEmployeeCSS.close}
                                onClick={closeModal}    
                            >취소</button>
                            <button 
                                className={ApvEmployeeCSS.confirm}
                                onClick={closeModal}    
                            >확인</button>
                        </div>
            </div>       
        </div>
    )
}

export default ApvEmployee;