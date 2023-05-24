import { useState } from "react";
import EmplyoeeDetails from "./EmployeeDetails";

function EmployeeItem({ emp }) {

    const [ empDetailsOpen, setEmpDetailsOpen ] = useState(false);

    const openEmpDetails = () => {
        setEmpDetailsOpen(true);
    }

    return (
        <>
            <tr onClick={ () => openEmpDetails() }>
                <td>{ emp.empCode }</td>
                <td>{ emp.empName }</td>
                <td>{ emp.empPhone }</td>
                <td>{ emp.empEmail }</td>
                <td>{ emp.empAddress }</td>
                <td>{ emp.dept.deptTitle }</td>
                <td>{ emp.position.positionName }</td>
                <td>{ emp.empEntDate }</td>
            </tr>
        { empDetailsOpen && <EmplyoeeDetails setEmpDetailsOpen={ setEmpDetailsOpen } emp={ emp }/> }
        </>
    );
}

export default EmployeeItem;