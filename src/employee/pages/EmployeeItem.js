import { useState } from "react";
import EmpDetails from "./EmployeeDetails";
import { useNavigate } from "react-router-dom";

function EmployeeItem({ emp : { empCode, empName, empPhone, empEmail, empAddress, dept, position, empEntDate } }) {

    const [ empDetailsOpen, setEmpDetailsOpen ] = useState(false);
    const navigate = useNavigate();

    const openEmpDetails = () => {
        setEmpDetailsOpen(true);
        navigate(`/employee/details/${ empCode }`);
    }

    return (
        <>
        <tr onClick={ () => openEmpDetails(empCode) }>
            <td>{ empCode }</td>
            <td>{ empName }</td>
            <td>{ empPhone }</td>
            <td>{ empEmail }</td>
            <td>{ empAddress }</td>
            <td>{ dept.deptTitle }</td>
            <td>{ position.positionName }</td>
            <td>{ empEntDate }</td>
        </tr>
        { empDetailsOpen && <EmpDetails setEmpDetailsOpen={ setEmpDetailsOpen }/> }
        </>
    );
}

export default EmployeeItem;