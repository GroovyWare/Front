import { useState } from "react";
import ApvResignDoc from "./ApvResignDoc";
import ApvResignCSS from "./ApvResign.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registResignDoc } from "../../../api/ApprovalAPICall";

function ApvResign(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [resStartDate, setResStartDate] = useState();
    const location = useLocation();
    const {item, startDate, endDate} = location.state;
    const {registResignation} = useSelector(state => state.approvalReducer);

    const onClickDocHandler = () => {

        const data = {
            docTitle : item,
            docStartDate : resStartDate,
        }

        console.log('data', data);
        dispatch(registResignDoc(data));
        console.log('registResignation', registResignation);

        if(registResignation?.status === 200){
            navigate("/approval", {replace : true});
        }
        
        

       
    }

    return(
        <>
            <ApvResignDoc
                setResStartDate = {setResStartDate}
            />
       <div>
                {/* 결재권자 표시 */}
                
                <div className={ApvResignCSS.authors}>
                    <div className={ApvResignCSS.author}></div>
                    <div className={ApvResignCSS.common}></div>
                    <div className={ApvResignCSS.common}></div>
                </div>
            </div>

            {/* 상세 정보 */}
            <div className={ApvResignCSS.detail}>
                <div className={ApvResignCSS.detail2}>상세 정보</div>
                    <div style={{display:"flex"}}>
                        <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 22, color:"#505050"}}>    
                            <div className={ApvResignCSS.details}>제목</div>
                            <div className={ApvResignCSS.details}>보존일</div>
                            <div className={ApvResignCSS.details}>기안자</div>
                            <div className={ApvResignCSS.details}>소속</div>
                            <div className={ApvResignCSS.details}>기안일</div>
                            <div className={ApvResignCSS.details}>열람권자</div>
                            <div className={ApvResignCSS.details}>부서</div>
                        </div>
                        <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 18, color:"#505050"}}>
                            <div className={ApvResignCSS.details2}>{item}</div>
                            <div className={ApvResignCSS.details2}>90일</div>
                            <div className={ApvResignCSS.details2}>ㅇㅇㅇ</div>
                            <div className={ApvResignCSS.details2}>ㅇㅇㅇ</div>
                            <div className={ApvResignCSS.details2}>[{startDate}] ~ [{endDate}]</div>
                            <div className={ApvResignCSS.details2}>ooo</div>
                            <div className={ApvResignCSS.details2}>ooo</div>
                        </div>
                    </div>
            </div>
            
            {/* 확인 버튼 */}
                <button 
                    className={ApvResignCSS.confirm}
                    onClick={onClickDocHandler}
                    >제출</button>
                <button className={ApvResignCSS.cancel}>취소</button>
        </>
    )
}

export default ApvResign;