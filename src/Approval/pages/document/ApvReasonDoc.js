import { useState } from 'react';
import ApvReasonDocCSS from './ApvReasonDoc.module.css';

function ApvReasonDoc(props){


    const [vacStartDate, setVacStartDate] = useState();
    const [vacEndDate, setVacEndDate] = useState();
    const [vacContext, setVacContext] = useState();

    /* 시작 기간 값 설정 */
    const onchangeStartHandler = (e) => {
        setVacStartDate(e.target.value);
    }

    /* 종료 기간 값 설정 */
    const onchangeEndHandler = (e) => {
        setVacEndDate(e.target.value);
    }

    /* 텍스트 박스 내용 값 설정 */
    const onChangeTextHandler = (e) => {
        setVacContext(e.target.value);
    }

    const onClickConfirm = () => {
        props.setVacStartDate(vacStartDate);
        props.setVacEndDate(vacEndDate);
        props.setVacContext(vacContext);
    }

    return(
        <>
            <div className={ApvReasonDocCSS.normal}>
                <div className={ApvReasonDocCSS.normals}>
                    <div className={ApvReasonDocCSS.document}>사유서</div>
                        {/* 표 그리기 */}
                        <div className={ApvReasonDocCSS.text}>
                                    {/* 표 제목 그리기 */}
                                    <div className={ApvReasonDocCSS.title2} >
                                        기간 및 일시
                                        {/* 기간 선택 */}
                                        <input
                                            type="date"
                                            onChange={onchangeStartHandler}
                                            style={{marginLeft: 50}}
                                            />  ~  
                                        <input
                                            type="date"
                                            onChange={onchangeEndHandler}
                                            style={{marginLeft: 10}}
                                        />
                                    </div>
                                </div>
                        <button 
                            onClick={onClickConfirm}
                            className={ApvReasonDocCSS.check}>확인</button>
                    
                    {/* 신청 사유 작성 */}
                    <div className={ApvReasonDocCSS.context2}>신청사유</div>
                    {/* 텍스트 박스 생성 */}
                        <input 
                            type="textbox"
                            className={ApvReasonDocCSS.textbox}
                            onChange={onChangeTextHandler}/>
                    </div>
                </div>
        </>
    )
}

export default ApvReasonDoc;