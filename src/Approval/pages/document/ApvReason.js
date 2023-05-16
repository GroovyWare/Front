import ApvReasonDoc from "./ApvReasonDoc";
import ApvReasonCSS from "./ApvReason.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registReasonDoc } from "../../../api/ApprovalAPICall";

function ApvReason(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {item, startDate, endDate} = location.state;
    const [selectedOption, setSelectedOption] = useState();
    const [vacStartDate, setVacStartDate] = useState();
    const [vacEndDate, setVacEndDate] = useState();
    const [vacContext, setVacContext] = useState();
    const { registReason } = useSelector(state => state.approvalReducer);

    const onClickDocHandler = () => {

        const data = {
            docTitle : item,
            docStartDate : vacStartDate,
            docEndDate : vacEndDate,
            docContext : vacContext
        }

        dispatch(registReasonDoc(data));

        if(registReason?.status === 200){
            navigate("/approval", {replace : true})
        }   
    }

    return(
        <>
            <ApvReasonDoc
                setVacStartDate = {setVacStartDate}
                setVacEndDate = {setVacEndDate}
                setVacContext = {setVacContext}
                />

            <div>
                {/* 결재권자 표시 */}
                
                <div className={ApvReasonCSS.authors}>
                    <div className={ApvReasonCSS.author}></div>
                    <div className={ApvReasonCSS.common}></div>
                    <div className={ApvReasonCSS.common}></div>
                </div>
            </div>

            {/* 상세 정보 */}
            <div className={ApvReasonCSS.detail}>
                <div className={ApvReasonCSS.detail2}>상세 정보</div>
                    <div style={{display:"flex"}}>
                        <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 22, color:"#505050"}}>    
                            <div className={ApvReasonCSS.details}>제목</div>
                            <div className={ApvReasonCSS.details}>보존일</div>
                            <div className={ApvReasonCSS.details}>기안자</div>
                            <div className={ApvReasonCSS.details}>소속</div>
                            <div className={ApvReasonCSS.details}>기안일</div>
                            <div className={ApvReasonCSS.details}>열람권자</div>
                            <div className={ApvReasonCSS.details}>부서</div>
                        </div>
                        <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 18, color:"#505050"}}>
                            <div className={ApvReasonCSS.details2}>{item}</div>
                            <div className={ApvReasonCSS.details2}>90일</div>
                            <div className={ApvReasonCSS.details2}>ㅇㅇㅇ</div>
                            <div className={ApvReasonCSS.details2}>ㅇㅇㅇ</div>
                            <div className={ApvReasonCSS.details2}>[{startDate}] ~ [{endDate}]</div>
                            <div className={ApvReasonCSS.details2}>ooo</div>
                            <div className={ApvReasonCSS.details2}>ooo</div>
                        </div>
                    </div>
            </div>
            
            {/* 확인 버튼 */}
                <button 
                    className={ApvReasonCSS.confirm}
                    onClick={onClickDocHandler}
                    >제출</button>
                <button className={ApvReasonCSS.cancel}>취소</button>
        </>
    )
}

export default ApvReason;