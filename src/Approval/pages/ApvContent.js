import { useEffect, useState } from "react";
import ApvContentCSS from "./ApvContent.module.css";
import { Link, useNavigate } from "react-router-dom";
import ApvEmployee from "../employee/ApvEmployee";
import { rangesIntersect } from "@fullcalendar/core/internal";
import { useDispatch } from "react-redux";
import { searchDepartmentList } from "../../api/ApprovalAPICall";
import { searchDocumentList } from "../../api/DocumentAPICalls";

function ApvContent(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [docTitle, setDocTitle] = useState();

    /* 모달창 노출 */
    const showModal = () => {
        setModalOpen(true);
    }

    /* 파일 양식명 저장 */
    const onclickHandler = (name) => {
        setDocTitle(name);
    }

    /* 확인 버튼 클릭 시 양식에 맞는 페이지로 이동 */
    const onClickDocHandler = () => {
        if(docTitle && startDate && endDate){
            navigate(`/approval/document`, {state : { docTitle: docTitle, startDate : startDate, endDate : endDate}});
        }
    }

    /* 기안서 결재 기간 설정(시작일) */
    const onChangeStartHandler = (e) => {
        setStartDate(e.target.value);
    }

    /* 기안서 결재 기간 설정(종료일) */
    const onChangeEndHandler = (e) => {
        setEndDate(e.target.value);
    }

    /* 선택한 양식명에 따라 기본 세팅되는 양식 다르게 하기 */
    useEffect(
        () => {
          dispatch(searchDocumentList(docTitle));
        },[docTitle]
      );

    return(
        <>
             <div className={ApvContentCSS.centerDiv}>
                <div style={{display:"flex"}}>
                    <div className={ApvContentCSS.docChooseDiv}>
                        <div style={{marginBottom: 100, marginTop: 30}}>
                            결재 양식 선택
                        </div>
                            <li onClick={() => onclickHandler('휴가신청서')}>휴가신청서</li>
                            <li onClick={() => onclickHandler('사유서')}>사유서</li>
                            <li onClick={() => onclickHandler('사직서')}>사직서</li>
                     </div>

                    <div className={ApvContentCSS.docDiv}>
                        <div className={ApvContentCSS.title}>
                            상세정보
                        </div>
                        <div className={ApvContentCSS.favorite}>+ 자주 쓰는 양식으로 추가</div>
                        
                        <div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex"}}>
                                <div>제목</div> {docTitle && <div style={{marginLeft: 100, fontSize: 18}}>{docTitle}</div>}
                            </div>
                            <div className={ApvContentCSS.docTitle}>
                                <div>보존일</div> <div className={ApvContentCSS.common}>90일</div>
                            </div>
                            <div className={ApvContentCSS.docTitle}>
                                <div>결재, 열람</div> <div className={ApvContentCSS.common}>
                                    <button 
                                        style={{width:100, marginTop : 0, marginLeft:-30}}
                                        onClick={showModal}    
                                    >조직도</button>
                                    {modalOpen && <ApvEmployee setModalOpen={setModalOpen}/>}
                                </div>
                            </div>
                            <div className={ApvContentCSS.docTitle}>
                                <div>부서문서함</div> <div style={{marginLeft : 45, fontSize: 14}}>
                                    <button 
                                        style={{width:100, marginTop:0}}
                                        onClick = {showModal}
                                    >조직도</button>
                                    {modalOpen && <ApvEmployee setModalOpen={setModalOpen}/>}
                                </div>
                            </div>
                            <div className={ApvContentCSS.docTitle}>
                                <div>시작일</div> <div className={ApvContentCSS.common}>
                                    <input 
                                        type="Date"
                                        onChange={onChangeStartHandler}
                                    ></input>
                                </div>
                            </div>
                            <div className={ApvContentCSS.docTitle}>
                                <div>종결일</div> <div className={ApvContentCSS.common}>
                                    <input 
                                    type="Date"
                                    onChange={onChangeEndHandler}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>  
                 <button 
                    className={ApvContentCSS.confirm}
                    onClick={onClickDocHandler}
                >
                    확인
                </button>
            </div>
        </>
    )
}

export default ApvContent;