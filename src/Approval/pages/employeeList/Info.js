import { useEffect, useState } from "react";
import ApvEmployeeCSS from "../../employee/ApvEmployee.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployeeList, searchEmployeeList } from "../../../api/ApprovalAPICall";

function Info({empName}){
    const dispatch = useDispatch();

    const [imgUrl, setImgUrl] = useState("../images/plus.png");
    const [imgYn, setImgYn] = useState(false);
    const [imgClicked, setImgClicked ] = useState();

    const {employeeList} = useSelector(state => state.approvalReducer);
    const {searchList} = useSelector(state => state.approvalReducer);
    
    const onClickHandler = (e) => {

        setImgClicked(true);

        if(e.target.src === "http://localhost:3000/images/plus.png"){
            e.target.src = "http://localhost:3000/images/minus.png";
            setImgYn(true);
        }else if(e.target.src === "http://localhost:3000/images/minus.png"){
            e.target.src = "http://localhost:3000/images/plus.png"
            setImgYn(false);
        }
        
    }

    return(
        <div className={ApvEmployeeCSS.title}> INFO
            <img 
                onClick={onClickHandler}
                src = {imgUrl}/>
                    {imgClicked && imgYn && employeeList && employeeList.data.data.map((employee, index) => (
                        <div className={ApvEmployeeCSS.subTitle}>
                            <div key={employee.position.positionCode} className={ApvEmployeeCSS.name1}>
                                {employee.dept.deptTitle === 'Info' && employee.position.positionName}
                            </div>
                            <div className={ApvEmployeeCSS.name2}>
                                {employee.dept.deptTitle === 'Info' && employee.empName}
                            </div>
                        </div>
                    ))}

                    {imgClicked && imgYn && searchList && searchList.data.map((search) => (
                        <div className={ApvEmployeeCSS.subTitle} key={search.position.positionCode}>
                            <div className={ApvEmployeeCSS.name1}>
                                {search.dept.deptTitle === 'Info' && search.position.positionName}
                            </div>
                            <div className={ApvEmployeeCSS.name2}>
                                {search.dept.deptTitle === 'Info' && search.empName}
                            </div>
                        </div>
                    ))}  
        </div>
    )
}

export default Info;