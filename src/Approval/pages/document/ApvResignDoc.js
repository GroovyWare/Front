import { useState } from 'react';
import ApvResignDocCSS from './ApvResignDoc.module.css';

function ApvResignDoc(props){

    const [resStartDate, setResStartDate] = useState();

     /* 시작 기간 값 설정 */
     const onchangeStartHandler = (e) => {
        setResStartDate(e.target.value);
    }

    const onClickConfirm = () => {

        props.setResStartDate(resStartDate);
    }
    
    return(
        <>
            <div className={ApvResignDocCSS.normal}>
            <div className={ApvResignDocCSS.normals}>
                <div className={ApvResignDocCSS.document}>사직서</div>
                {/* 표 그리기 */}
                <div className={ApvResignDocCSS.text}>
                    <div className={ApvResignDocCSS.text2}>
                        <div className={ApvResignDocCSS.text3}>
                            {/* 표 제목 그리기 */}
                            <div className={ApvResignDocCSS.title} >
                                성명
                                <div style={{marginLeft: 150}}>
                                </div>
                            </div>
                        </div>
                        <div className={ApvResignDocCSS.text3}>
                            <div className={ApvResignDocCSS.title2} >
                                기간 및 일시
                                {/* 기간 선택 */}
                                <input
                                    type="date"
                                    onChange={onchangeStartHandler}
                                    style={{marginLeft: 50}}
                                    />
                            </div>
                        </div>
                        <div className={ApvResignDocCSS.context}>
                            <div className={ApvResignDocCSS.title} >
                                직위
                            </div>
                        </div>
                        <button 
                            onClick={onClickConfirm}
                            className={ApvResignDocCSS.check}>확인</button>
                    </div>
                    {/* 신청 사유 작성 */}
                    <div className={ApvResignDocCSS.context2}>신청사유
                    </div>
                        <div className={ApvResignDocCSS.textbox}>
                            상기 본인은 개인 사정으로 인하여 {resStartDate} 부로 사직하고자 이에 사직서를 제출합니다.
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ApvResignDoc;