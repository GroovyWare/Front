import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ApvEmployeeCSS from "./ApvEmployee.module.css";
import ApvEmployeeDrag from './ApvEmployeeDrag';

function Head({empName}){

    const [imgUrl, setImgUrl] = useState("../images/plus.png");
    const [imgYn, setImgYn] = useState({});
    const [imgClicked, setImgClicked] = useState({});

    const { employeeList, searchList, department } = useSelector(state => state.approvalReducer);
    
    const onClickHandler = (deptTitle) => {
        setImgYn(prevState => ({
            ...prevState,
            [deptTitle]: !prevState[deptTitle]
        }));

        setImgClicked(prevState => ({
            ...prevState,
            [deptTitle]: true
        }));
    }

    return(
        <>
             <div className={ApvEmployeeCSS.title}> 
                {department && department.data.map(
                    (department) => (
                        <div key={department.deptTitle}>
                            <div style={{display:"flex"}}>
                                <div className={ApvEmployeeCSS.title}>
                                    {department.deptTitle}
                                </div>
                                <img 
                                    onClick={() => onClickHandler(department.deptTitle)}
                                    src={imgClicked[department.deptTitle] && imgYn[department.deptTitle] ? "../images/minus.png" : "../images/plus.png"}
                                    className={ApvEmployeeCSS.titleimg}
                                />
                            </div>
                            <hr className={ApvEmployeeCSS.line}/>
                            
                            {imgClicked[department.deptTitle] && imgYn[department.deptTitle] &&  employeeList && employeeList.data.data.map((employee) => {
                                if(employee.dept.deptTitle === department.deptTitle) {
                                    return <ApvEmployeeDrag employee={employee} />
                                }
                            })}
                            
                            {(empName && searchList) && searchList.data.map((search) => (
                                search.dept.deptTitle === department.deptTitle && search.empName.includes(empName) &&
                                <div className={ApvEmployeeCSS.subTitle}>
                                    <div className={ApvEmployeeCSS.name1}>
                                        {search.position.positionName}
                                    </div>
                                    <div className={ApvEmployeeCSS.name2}>
                                        {search.empName}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </>
    )}

export default Head;