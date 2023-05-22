import { useParams } from 'react-router-dom';
import empDetailsCSS from './EmployeeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeDetailsAPI } from '../../api/EmployeeAPICalls';
import { useEffect, useRef } from 'react';

function EmployeeDetails({ setEmpDetailsOpen }) {
    
    const params = useParams();
    const empCode = params.empCode;
    console.log('empCode', empCode);

    const dispatch = useDispatch();
    const emp = useSelector(state => state.employeeReducer);

    useEffect(
        () => {
            dispatch(callEmployeeDetailsAPI({ empCode }));
        },
        []
    );
        
    const closeEmpDetails = () => {
        setEmpDetailsOpen(false);
    };
        
    return (
        <div className={ empDetailsCSS.container }>
            <div>직원 상세 정보</div>
            <button className={ empDetailsCSS.closeBtn } onClick={ closeEmpDetails }>
                x
            </button>
            <div>
                <img src={ emp.file?.fileSavedName }/>
            </div>
            { emp.empName }
        </div>
    )
}

export default EmployeeDetails;