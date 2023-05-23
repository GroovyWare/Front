import { useContext, useEffect, useState } from 'react';
import ApvEmployeeCSS from './ApvEmployee.module.css';
import Head from './Head';
import SelectReader from "../pages/person/SelectReader";
import SelectApprove from "../pages/person/SelectApprove";
import { useDispatch, useSelector } from 'react-redux';
import { searchEmployeeList, selectEmployeeList, searchDepartmentList, registDoc } from '../../api/ApprovalAPICall';
<<<<<<< HEAD
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function ApvEmployee({setModalOpen}){

    const [empName, setEmpName] = useState(''); 
    const [form, setForm] = useState([]);
=======
import { EmployeeContext } from './EmployeeProvider';

function ApvEmployee({setModalOpen}){
    
    const {approvedEmployees, setApprovedEmployees, readEmployees, setReadEmployees } = useContext(EmployeeContext);
    const [empName, setEmpName] = useState('');
>>>>>>> 37798f8bb7450396051fb147b4274708a059d9ff

    const dispatch = useDispatch();

    const closeModal = () => {
        setModalOpen(false);
        setApprovedEmployees([]);
        setReadEmployees([]);  
    }

    const onClickHandler = () => {
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
                dispatch(searchEmployeeList(empName));
            }else{
                dispatch(selectEmployeeList());
            }
        }, [empName]
    )

    useEffect(
        () => {
            dispatch(searchDepartmentList());
        },[]
    )

    return(
<<<<<<< HEAD
        <div className={ApvEmployeeCSS.container}>
            <div className={ApvEmployeeCSS.wrap}>
=======
        <>
                <div className={ApvEmployeeCSS.wrap}>
>>>>>>> 37798f8bb7450396051fb147b4274708a059d9ff
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
                                onClick={onClickHandler}    
                            >확인</button>
                        </div>
<<<<<<< HEAD
            </div>       
        </div>
=======
            </div>      
        </>
>>>>>>> 37798f8bb7450396051fb147b4274708a059d9ff
    )
}

export default ApvEmployee;