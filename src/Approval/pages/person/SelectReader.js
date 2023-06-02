import { useDrop } from "react-dnd";
import SelectCSS from "./Select.module.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmployeeContext } from "../employee/EmployeeProvider";
import { useLocation } from "react-router-dom";

function SelectReader(){
    const {readEmployees, setReadEmployees} = useContext(EmployeeContext);

    const location = useLocation();

    const [, drop] = useDrop({
        accept: 'employee',
        drop: (item, monitor) => {
            if (readEmployees.length >= 3) {
                toast.warning('3명 이상 선택하실 수 없습니다.');
                return;
            }

            // 이미 승인된 목록에 직원이 있는지 확인합니다.
            if (readEmployees.find(emp => emp.name === item.name)) {
                toast.warning('동일인은 추가할 수 없습니다.');
                return;
            }

            setReadEmployees([...readEmployees, item]);
        },
    });

    useEffect(() => {
        if (location.pathname !== '/approval/document') {
            setReadEmployees([]);
        }
      }, [location, setReadEmployees]);

    return(
        <>
            <div ref={drop} className={SelectCSS.wrap}>
                <div className={SelectCSS.title}>
                    열람권자
                </div>
                <table style={{width:300, marginTop : 10, marginLeft : 8}}>
                {readEmployees && readEmployees.map(employee => (
                        <tr>
                            <td className={SelectCSS.contextTitle}>{employee.dept}</td>
                            <td className={SelectCSS.contextTitle}>{employee.position}</td>
                            <td className={SelectCSS.context}>{employee.name}</td>
                        </tr>
                ))}
                </table>
            </div>
        </>
    )
}

export default SelectReader;