import { useDispatch, useSelector } from "react-redux";
import EmpCSS from "./Employee.module.css";
import { useEffect, useState } from "react";
import { callEmployeeListAPI } from "../../api/EmployeeAPICalls";
import EmployeeList from "./EmployeeList";
import PagingBar from "../../components/common/PagingBar";

function Employee() {

    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeeReducer);
    const pageInfo = employees.pageInfo;
    const employeeList = employees.data;


    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(
        () => {
            dispatch(callEmployeeListAPI({ currentPage }));
        },
        [currentPage]
    );
    
    return (
        <div className={ EmpCSS.container }>
            <div className={ EmpCSS.pageTitle }>
                <div>직원관리</div>
            </div>
            <div className={ EmpCSS.searchbar}>
                <input
                    type="text"
                    placeholder="이름을 입력해주세요."
                />
            </div>
            <div>{ employeeList && <EmployeeList employeeList={ employeeList } employees ={ employees }/>}</div>
            <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div>
        </div>
       
    )}

export default Employee;