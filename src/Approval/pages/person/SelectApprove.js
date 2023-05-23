import React, { useContext, useEffect, useState } from 'react';
import SelectCSS from "./Select.module.css";
import { useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { sort } from 'remirror';
=======
import { EmployeeContext } from '../../employee/EmployeeProvider';
import { useLocation } from 'react-router-dom';
>>>>>>> 37798f8bb7450396051fb147b4274708a059d9ff

function SelectApprove(){
    const {approvedEmployees, setApprovedEmployees} = useContext(EmployeeContext);

<<<<<<< HEAD
    const [approvedEmployees, setApprovedEmployees] = useState([]);

=======
    const positionWeight = { '대표': 1, '팀매니저': 2, '시니어': 3, '일반': 4 };
    const location = useLocation();
    
>>>>>>> 37798f8bb7450396051fb147b4274708a059d9ff
    const [, drop] = useDrop({
        accept: 'employee',
        drop: (item) => {
            if (approvedEmployees.length >= 3) {
               toast.warning('3명 이상 선택하실 수 없습니다.');
                return;
            }

<<<<<<< HEAD
            // 이미 승인된 목록에 직원이 있는지 확인합니다.
            if (approvedEmployees.find(emp => emp.name === item.name)) {
                toast.warning('동일인은 추가 할 수 없습니다.')
                return;
            }
            
            setApprovedEmployees([...approvedEmployees, item]);
=======
          // 이미 승인된 목록에 동일 직급이 있는지 확인합니다.
          if(approvedEmployees.find(emp => emp.position === item.position)){
            toast.warning('동일 직급은 추가 할 수 없습니다.')
            return;
          }

          // 승인 목록에 일반 직급이 추가 되지 않도록 합니다.
          if(item.position === '일반'){
            toast.warning('일반 직급은 추가 할 수 없습니다.')
            return;
          }
    
          // 직급에 따라 정렬하여 추가합니다.
          setApprovedEmployees(prev => {
            const newList = [...prev];
            newList.push(item);
            newList.sort((a, b) => positionWeight[a.position] - positionWeight[b.position]);
            return newList;
          });
>>>>>>> 37798f8bb7450396051fb147b4274708a059d9ff
        },
    });

      useEffect(() => {
        if (location.pathname !== '/approval/document') {
            setApprovedEmployees([]);
        }
      }, [location, setApprovedEmployees]);

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