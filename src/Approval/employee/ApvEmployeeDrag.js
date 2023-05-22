import { useDrag } from 'react-dnd';
import ApvEmployeeCSS from "./ApvEmployee.module.css";

function ApvEmployeeDrag({ employee }) {
    
    const [{ isDragging }, drag] = useDrag({
        type: 'employee',
        item: { name: employee.empName, position: employee.position.positionName, dept : employee.dept.deptTitle },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        
    });

    return (
        <div className={ApvEmployeeCSS.subTitle} ref={drag}>
            <div className={ApvEmployeeCSS.name1}>
                {employee.position.positionName}
            </div>
            <div className={ApvEmployeeCSS.name2}>
                {employee.empName}
            </div>
            <div className={ApvEmployeeCSS.name2}>
                {employee.dept.department}
            </div>
        </div>
    );
}

export default ApvEmployeeDrag;