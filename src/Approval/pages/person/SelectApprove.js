import React, { useEffect, useState } from 'react';
import SelectCSS from "./Select.module.css";
import { useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
import { sort } from 'remirror';

function SelectApprove(){

    const [approvedEmployees, setApprovedEmployees] = useState([]);

    const [, drop] = useDrop({
        accept: 'employee',
        drop: (item) => {
            if (approvedEmployees.length >= 3) {
               toast.warning('3명 이상 선택하실 수 없습니다.');
                return;
            }

            // 이미 승인된 목록에 직원이 있는지 확인합니다.
            if (approvedEmployees.find(emp => emp.name === item.name)) {
                toast.warning('동일인은 추가할 수 없습니다.');
                return;
            }
            
            setApprovedEmployees([...approvedEmployees, item]);
        },
    });

    return(
        <>
            <div ref={drop} className={SelectCSS.wrap}>
                <div className={SelectCSS.title}>
                    결재권자
                </div>
                <table style={{marginLeft : 120, marginTop : 55}}>
                {approvedEmployees.map(employee => (
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

export default SelectApprove;