import { useState } from "react";
import ApvEmployeeCSS from "../../employee/ApvEmployee.module.css";
import { useSelector } from "react-redux";


function Filates(){

    const [imgUrl, setImgUrl] = useState("../images/plus.png");
    const [imgYn, setImageYn] = useState(true);
    const [imgClicked, setImgClicked ] = useState();

    const { employeeList } = useSelector(state => state.approvalReducer);
    
    const onClickHandler = (e) => {
        setImgClicked(true);

        if(e.target.src === "http://localhost:3000/images/plus.png"){
            e.target.src = "http://localhost:3000/images/minus.png";
            setImageYn(true);
        }else if(e.target.src === "http://localhost:3000/images/minus.png"){
            e.target.src = "http://localhost:3000/images/plus.png"
            setImageYn(false);
        }
        
    }

    return(
        <div className={ApvEmployeeCSS.title}> 필라테스
            <img 
                onClick={onClickHandler}
                src = {imgUrl}/>
                    {imgClicked && imgYn && employeeList && employeeList.data.data.map((employee, index) => (
                        <div className={ApvEmployeeCSS.subTitle}>
                            <div key={employee.position.positionCode} className={ApvEmployeeCSS.name1}>
                                {employee.dept.deptTitle === '필라테스' && employee.position.positionName}
                            </div>
                            <div className={ApvEmployeeCSS.name2}>
                                    {employee.dept.deptTitle === '필라테스' && employee.empName}
                            </div>
                        </div>
                    ))}     
        </div>
    )
}

export default Filates;