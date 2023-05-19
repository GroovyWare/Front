import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ApvVacationCSS from './ApvVacation.module.css';
import ApvVacationDoc from "./ApvVacationDoc";
import { useDispatch, useSelector } from "react-redux";
import { registVacationDoc } from "../../../api/ApprovalAPICall";
import ReactDOMServer from 'react-dom/server';

function ApvVacation(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {item, startDate, endDate} = location.state;
    const [selectedOption, setSelectedOption] = useState();
    const [vacStartDate, setVacStartDate] = useState();
    const [vacEndDate, setVacEndDate] = useState();
    const [vacContext, setVacContext] = useState();
    const [form, setForm] = useState();
    const {regist}  = useSelector(state => state.approvalReducer);

    const onClickDocHandler = () => {

                const data = {
                    docTitle : item,
                    docCustom : selectedOption,
                    docStartDate : vacStartDate,
                    docEndDate : vacEndDate,
                    docContext : vacContext
                }

                dispatch(registVacationDoc(data));

                if(regist?.status === 200){
                    navigate("/approval", {replace : true})
                }   
            }
        
    

    return(
        <>
        <ApvVacationDoc 
            setSelectedOption = {setSelectedOption}
            setVacStartDate = {setVacStartDate}
            setVacEndDate = {setVacEndDate}
            setVacContext = {setVacContext}/>

            <div>
                {/* 결재권자 표시 */}
                
                <div className={ApvVacationCSS.authors}>
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