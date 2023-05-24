import { useContext, useEffect, useState } from "react";
import ApvContentCSS from "./ApvContent.module.css";
import { useNavigate } from "react-router-dom";
import ApvEmployee from "./employee/ApvEmployee";
import { useDispatch, useSelector } from "react-redux";
import { searchDocTitleAPI, searchDocumentList } from "../../api/DocumentAPICalls";
import React from "react";

function ApvContent(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [docTitles, setDocTitles] = useState();

    const {search} = useSelector(state => state.documentReducer);

    /* 모달창 노출 */
    const showModal = () => {
        setModalOpen(true);
    }

    /* 파일 양식명 저장 */
    const onclickHandler = (name) => {
        setDocTitles(name);
    }

    /* 확인 버튼 클릭 시 양식에 맞는 페이지로 이동 */
    const onClickDocHandler = () => {
        if(docTitles && startDate && endDate){
            navigate(`/approval/document`, {state : { docTitle: docTitles, startDate : startDate, endDate : endDate}});
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

    /* 양식명 가져오기 */
    useEffect(
        () => {
            dispatch(searchDocTitleAPI());
        },[docTitles]
    )

    /* 선택한 양식명에 따라 기본 세팅되는 양식 다르게 하기 */
    useEffect(
        () => {
          dispatch(searchDocumentList(docTitles));
        },[docTitles]
      );

    return(
        <div className={ApvContentCSS.container}>
             <div className={ApvContentCSS.centerDiv}>
                <div style={{display:"flex"}}>
                    <div className={ApvContentCSS.docChooseDiv}>
                        <div style={{marginBottom: 100, marginTop: 30}}>
                            결재 양식 선택
                        </div>
                            {search && search.data.map((search) => (
                                <>
                                <li onClick={() => onclickHandler(search.docTitle)}>{search.docTitle}</li>
                                </>
                            ))}
                     </div>

                    <div className={ApvContentCSS.docDiv}>
                        
                        <div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex"}}>
                                <div>제목</div> {docTitles && <div style={{marginLeft: 100, fontSize: 18}}>{docTitles}</div>}
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
                    className={ApvContentCSS.centerDivButton}
                    onClick={onClickDocHandler}
                >
                    확인
                </button>
            </div>
        </div>
    )
}

export default ApvContent;