import { useNavigate } from "react-router-dom";
import EmployeeItem from "./EmployeeItem";
import employeeListCSS from "./EmployeeList.module.css";
import { isAdmin } from "../../utils/TokenUtils";


function EmployeeList({employeeList}) {

    const navigate = useNavigate();


    const moveToRegistPage = () => {
        navigate("/employee/regist")
    }

    return (
        <>
            <div className={ employeeListCSS.content }>
                <div className={ employeeListCSS.empTableDiv }>
                    <table className={ employeeListCSS.empTable }>
                        <tr>
                            <th>직원번호</th>
                            <th>이름</th>
                            <th>휴대폰</th>
                            <th>이메일</th>
                            <th>주소</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>입사일</th>
                        </tr>
                        {   
                            Array.isArray(employeeList)
                            && employeeList.map(emp => <EmployeeItem key={ emp.empCode } emp={ emp }/>)
                        }
                    </table>
                </div>
          </div>
          { isAdmin() ?
            <button className={ employeeListCSS.registBtn } onClick={ moveToRegistPage }>등록</button>
          : '' }
    </>
    )
}

export default EmployeeList;