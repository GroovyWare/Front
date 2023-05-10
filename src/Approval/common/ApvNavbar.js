import { renderIntoDocument } from "react-dom/test-utils";
import ApvNavbarCSS from "./ApvNavbar.module.css";
import { useState } from "react";

function ApvNavbar(){
    const [item, setItem] = useState();

    const onclickHandler = (name) => {
        setItem(name);
    }

    return(
    <>
        <div className={ApvNavbarCSS.wrap}>
            <div className={ApvNavbarCSS.navbarDiv}>
                <div>
                    <button>새 결재 진행</button>
                    <li>자주 쓰는 양식</li>
                    <div></div>
                    <li style={{marginTop:50, marginBottom:10}}>개인</li>
                        <div className={ApvNavbarCSS.liDiv}>결재 요청</div>
                        <div className={ApvNavbarCSS.liDiv}>결재 대기</div>
                    <li style={{marginTop:50, marginBottom:10}}>부서</li>
                        <div className={ApvNavbarCSS.liDiv}>부서참조함</div>
                </div>
            </div>

            <div className={ApvNavbarCSS.centerDiv}>
                <div style={{display:"flex"}}>
                    <div className={ApvNavbarCSS.docChooseDiv}>
                        <div style={{marginBottom: 100, marginTop: 30}}>
                            결재 양식 선택
                        </div>
                            <li onClick={() => onclickHandler('휴가신청서')}>휴가신청서</li>
                            <li onClick={() => onclickHandler('시말서')}>시말서</li>
                            <li onClick={() => onclickHandler('구매품의서')}>구매품의서</li>
                            <li onClick={() => onclickHandler('사직서')}>사직서</li>
                     </div>

                    <div className={ApvNavbarCSS.docDiv}>
                        <div className={ApvNavbarCSS.title}>
                            상세정보
                        </div>
                        <div className={ApvNavbarCSS.favorite}>+ 자주 쓰는 양식으로 추가</div>
                        
                        <div>
                            <div className={ApvNavbarCSS.docTitle} style={{display:"flex"}}>
                                <div>제목</div> {item && <div style={{marginLeft: 100, fontSize: 18}}>{item}</div>}
                            </div>
                            <div className={ApvNavbarCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>보존일</div> <div style={{marginLeft: 80, fontSize: 18}}>90일</div>
                            </div>
                            <div className={ApvNavbarCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>결재, 열람</div> <div style={{marginLeft : 50, fontSize: 14}}>
                                    <button style={{width:100, marginTop: 0}}>조직도</button>
                                </div>
                            </div>
                            <div className={ApvNavbarCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>부서문서함</div> <div style={{marginLeft : 45, fontSize: 14}}>
                                    <button style={{width:100,  marginTop: 0}}>조직도</button>
                                </div>
                            </div>
                            <div className={ApvNavbarCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>시작일</div> <div style={{marginLeft : 80, fontSize: 14}}>
                                    <input type="Date"></input>
                                </div>
                            </div>
                            <div className={ApvNavbarCSS.docTitle} style={{display:"flex", marginTop:10}}>
                                <div>종결일</div> <div style={{marginLeft : 80, fontSize: 14}}>
                                    <input type="Date"></input>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>  
                 <button 
                    style={{backgroundColor:"#1A1779", color:"white", width:100, marginRight: 20}}
                >
                    확인
                </button>
            </div>
        </div>
    </>
    )
}

export default ApvNavbar;