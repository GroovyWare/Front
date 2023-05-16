import { useEffect, useState } from "react";
import ApvEmployeeCSS from "../../employee/ApvEmployee.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployeeList } from "../../../api/ApprovalAPICall";

function Head({name}){

    const [imgUrl, setImgUrl] = useState("../images/plus.png");
    const [imgYn, setImageYn] = useState(true);
    const [imgClicked, setImgClicked ] = useState();

    const { employeeList } = useSelector(state => state.approvalReducer);

    const dispatch = useDispatch();
    
    const onClickHandler = (e) => {

        setImgClicked(true);

        if(e.target.src === "http://localhost:3000/images/plus.png"){
            e.target.src = "http://localhost:3000/images/minus.png";
            dispatch(selectEmployeeList());
            setImageYn(true);
        }else if(e.target.src === "http://localhost:3000/images/minus.png"){
            e.target.src = "http://localhost:3000/images/plus.png"
            setImageYn(false);
        }
    }

    return(
        <>
            <div className={ApvEmployeeCSS.title}> 대표 
                <img 
                    onClick={onClickHandler}
                    src = {imgUrl}
                />  
                    {imgClicked && imgYn && employeeList && employeeList.data.data.map((employee) => (
                        <div className={ApvEmployeeCSS.subTitle}>
                            <div key={employee.position.positionCode} className={ApvEmployeeCSS.name1}>
                                    {employee.position.positionName === '대표' && employee.position.positionName}
                            </div>
                            <div className={ApvEmployeeCSS.name2}>
                                    {employee.position.positionName === '대표' && employee.empName}
                            </div>
                        </div>
                    ))}           
            </div>

    </>   
    )
}

export default Head;