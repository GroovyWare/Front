import { useDispatch, useSelector } from "react-redux";
import EmpCSS from "./Employee.module.css";
import { useEffect, useState } from "react";
import { callEmployeeListAPI, callEmployeeSearchListAPI } from "../../api/EmployeeAPICalls";
import EmployeeList from "./EmployeeList";
import PagingBar from "../../components/common/PagingBar";
import searchImg from "../../components/common/img/search.svg";

function Employee() {


    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeeReducer);
    const pageInfo = employees.pageInfo;
    const employeeList = employees.data;
    
    const [ search, setSearch ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(
        () => {
            if(search) {
                dispatch(callEmployeeSearchListAPI({ search, currentPage }));
            } else {
                dispatch(callEmployeeListAPI({ currentPage })); 
            }
        },
        [currentPage, search] 
    );

    const searchChangeHandler =(e) => {
        setSearch(e.target.value)
    }
    
    return (
        <div className={ EmpCSS.container }>
            <div className={ EmpCSS.pageTitle }>
                직원관리
            </div>  
            <div className={ EmpCSS.searchbar}>
                <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    onChange={ searchChangeHandler }
                />
                <button>
                    <img src={ searchImg } alt="검색" className={ EmpCSS.search }/>
                </button>
            </div>
            <div>{ employeeList && <EmployeeList employeeList={ employeeList } employees ={ employees }/>}</div>
            <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div>
        </div>
       
    )}

export default Employee;