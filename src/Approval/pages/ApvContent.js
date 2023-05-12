import { useState } from "react";
import ApvContentCSS from "./ApvContent.module.css";
import { Link, useNavigate } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import ApvVacationDoc from "./document/ApvVacationDoc";
import axios from "axios";


function ApvContent(){
    const navigate = useNavigate();
    const [item, setItem] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const onclickHandler = (name) => {
        setItem(name);
    }

    const onClickDocHandler = () => {
    
            if(item === '휴가신청서'){
                navigate(`/approval/vacation`, {state : { item: item, startDate : startDate, endDate : endDate }});
            }else if(item === '사직서'){
                navigate("/approval/resignation", {state : { item:item, startDate : startDate, endDate : endDate }});
            }else if(item === '시말서'){
                navigate("/approval/reason", {state : { item : item, startDate : startDate, endDate : endDate }});
            }else if(item === '구매품의서'){
                navigate("/approval/purchase", {state : { item : item, startDate : startDate, endDate : endDate }});
            }
    }
    

    
    const onChangeStartHandler = (e) => {
        setStartDate(e.target.value);
    }

    const onChangeEndHandler = (e) => {
        setEndDate(e.target.value);
    }

    const onClickEmpHandler = () => {
        navigate('/approval/employee')
    }

    return(
        <>
             <div className={ApvContentCSS.centerDiv}>
                <div style={{display:"flex"}}>
                    <div className={ApvContentCSS.docChooseDiv}>
                        <div style={{marginBottom: 100, marginTop: 30}}>
                            결재 양식 선택
                        </div>
                            <li onClick={() => onclickHandler('휴가신청서')}>휴가신청서</li>
                            <li onClick={() => onclickHandler('시말서')}>시말서</li>
                            <li onClick={() => onclickHandler('구매품의서')}>구매품의서</li>
                            <li onClick={() => onclickHandler('사직서')}>사직서</li>
                     </div>

                    <div className={ApvContentCSS.docDiv}>
                        <div className={ApvContentCSS.title}>
                            상세정보
                        </div>
                        <div className={ApvContentCSS.favorite}>+ 자주 쓰는 양식으로 추가</div>
                        
                        <div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex"}}>
                                <div>제목</div> {item && <div style={{marginLeft: 100, fontSize: 18}}>{item}</div>}
                            </div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>보존일</div> <div style={{marginLeft: 80, fontSize: 18}}>90일</div>
                            </div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>결재, 열람</div> <div style={{marginLeft : 50, fontSize: 14}}>
                                    <button 
                                        style={{width:100, marginTop: 0}}
                                        onClick={onClickEmpHandler}    
                                    >조직도</button>
                                </div>
                            </div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>부서문서함</div> <div style={{marginLeft : 45, fontSize: 14}}>
                                    <button style={{width:100,  marginTop: 0}}>조직도</button>
                                </div>
                            </div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>시작일</div> <div style={{marginLeft : 80, fontSize: 14}}>
                                    <input 
                                        type="Date"
                                        onChange={onChangeStartHandler}
                                    ></input>
                                </div>
                            </div>
                            <div className={ApvContentCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>종결일</div> <div style={{marginLeft : 80, fontSize: 14}}>
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
                    style={{backgroundColor:"#1A1779", color:"white", width:100, marginRight: 20}}
                    onClick={onClickDocHandler}
                >
                    확인
                </button>
            </div>
        </>
    )
}

export default ApvContent;