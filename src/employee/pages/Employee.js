import { useDispatch, useSelector } from "react-redux";
import EmpCSS from "./Employee.module.css";
import { useEffect, useState } from "react";
import { callEmployeeListAPI } from "../../api/EmployeeAPICalls";
import EmployeeList from "./EmployeeList";
import PagingBar from "../../components/common/PagingBar";

function Employee() {

    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeeReducer);

    const employeeList = employees.data;
    const pageInfo = employees.pageInfo;


    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(
        () => {
            dispatch(callEmployeeListAPI({ currentPage }));
        },
        [currentPage]
    );

    return (
        <div className={ EmpCSS.container }>
            <h3>직원관리</h3>
                <div>{ employeeList && <EmployeeList employeeList={ employeeList }/>}</div>
                <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div>
        </div>
       
    )}

export default Employee;