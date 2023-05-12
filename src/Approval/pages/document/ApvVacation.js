import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ApvVacationCSS from './ApvVacation.module.css';
import ApvVacationDoc from "./ApvVacationDoc";
import axios from "axios";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import ApvVacationContext from "./ApvVacationContext";


function ApvVacation(){
    const navigate = useNavigate();
    const location = useLocation();
    const {item, startDate, endDate} = location.state;
    const [selectedOption, setSelectedOption] = useState();
    const [vacStartDate, setVacStartDate] = useState();
    const [vacEndDate, setVacEndDate] = useState();
    const [vacContext, setVacContext] = useState();
    
    console.log('1', selectedOption);
    console.log('2', vacStartDate);
    console.log('3', vacEndDate);
    console.log('4', vacContext);

    const onClickDocHandler = () => {
        navigate("/approval/vacation/getContext", 
        {state : { selectedOption : selectedOption, vacStartDate : vacStartDate, vacEndDate : vacEndDate, vacContext :vacContext }});

        const data = {
            docTitle : item,
            docCustom : selectedOption,
            docStartDate : vacStartDate,
            docEndDate : vacEndDate,
            docContext : vacContext
        }

        console.log(data);

        fetch('http://localhost:8059/document/save', {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
    }

    return(
        <>
        <ApvVacationDoc 
            setSelectedOption = {setSelectedOption}
            setVacStartDate = {setVacStartDate}
            setVacEndDate = {setVacEndDate}
            setVacContext = {setVacContext} />

            <div>
                {/* 결재권자 표시 */}
                
                <div style={{display:"flex"}}>
                    <div className={ApvVacationCSS.author}></div>
                    <div className={ApvVacationCSS.common}></div>
                    <div className={ApvVacationCSS.common}></div>
                </div>
            </div>

            {/* 상세 정보 */}
            <div className={ApvVacationCSS.detail}>
                <div className={ApvVacationCSS.detail2}>상세 정보</div>
                    <div style={{display:"flex"}}>
                        <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 22, color:"#505050"}}>    
                            <div className={ApvVacationCSS.details}>제목</div>
                            <div className={ApvVacationCSS.details}>보존일</div>
                            <div className={ApvVacationCSS.details}>기안자</div>
                            <div className={ApvVacationCSS.details}>소속</div>
                            <div className={ApvVacationCSS.details}>기안일</div>
                            <div className={ApvVacationCSS.details}>열람권자</div>
                            <div className={ApvVacationCSS.details}>부서</div>
                        </div>
                        <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 18, color:"#505050"}}>
                            <div className={ApvVacationCSS.details2}>{item}</div>
                            <div className={ApvVacationCSS.details2}>90일</div>
                            <div className={ApvVacationCSS.details2}>ㅇㅇㅇ</div>
                            <div className={ApvVacationCSS.details2}>ㅇㅇㅇ</div>
                            <div className={ApvVacationCSS.details2}>[{startDate}] ~ [{endDate}]</div>
                            <div className={ApvVacationCSS.details2}>ooo</div>
                            <div className={ApvVacationCSS.details2}>ooo</div>
                        </div>
                    </div>
            </div>
            
            {/* 확인 버튼 */}
                <button 
                    className={ApvVacationCSS.confirm}
                    onClick={onClickDocHandler}
                    >제출</button>
                <button className={ApvVacationCSS.cancel}>취소</button>
        </>
    )
}

export default ApvVacation;