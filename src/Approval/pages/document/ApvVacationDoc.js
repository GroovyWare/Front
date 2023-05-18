import { useEffect, useState } from "react";
import ApvVacationDocCSS from './ApvVacationDoc.module.css';

function ApvVacationDoc(props){

    const [selectedOption, setSelectedOption] = useState();
    const [vacStartDate, setVacStartDate] = useState();
    const [vacEndDate, setVacEndDate] = useState();
    const [vacContext, setVacContext] = useState();

    /* 라디오 선택 버튼 value 값 설정 */
    const onchangeHandler = (e) => {
        setSelectedOption(e.target.value);
    }

    /* 휴가 시작 기간 값 설정 */
    const onchangeStartHandler = (e) => {
        setVacStartDate(e.target.value);
    }

    /* 휴가 종료 기간 값 설정 */
    const onchangeEndHandler = (e) => {
        setVacEndDate(e.target.value);
    }

    /* 텍스트 박스 내용 값 설정 */
    const onChangeTextHandler = (e) => {
        setVacContext(e.target.value);
    }

    const onClickConfirm = () => {

        props.setSelectedOption(selectedOption);
        props.setVacStartDate(vacStartDate);
        props.setVacEndDate(vacEndDate);
        props.setVacContext(vacContext);
    }

    const html = ``
    
    return(
        <>
        <div className={ApvVacationDocCSS.normal}>
            <div className={ApvVacationDocCSS.normals}>
                <div className={ApvVacationDocCSS.document}>휴가신청서</div>
                {/* 표 그리기 */}
                <div className={ApvVacationDocCSS.text}>
                    <div className={ApvVacationDocCSS.text2}>
                        <div className={ApvVacationDocCSS.text3}>
                            {/* 표 제목 그리기 */}
                            <div className={ApvVacationDocCSS.title} >
                                휴가종류
                                {/* 라디오 버튼 선택 */}
                                <input 
                                        type="radio" 
                                        value="연차" 
                                        checked={selectedOption==='연차'} 
                                        onChange={onchangeHandler}
                                        style={{marginLeft: 60}}
                                        />연차
                                    <input 
                                        type="radio" 
                                        value="반차" 
                                        checked={selectedOption==='반차'} 
                                        onChange={onchangeHandler}
                                        style={{marginLeft: 10}}/>반차
                                    <input 
                                        type="radio" 
                                        value="경조" 
                                        checked={selectedOption==='경조'} 
                                        onChange={onchangeHandler}
                                        style={{marginLeft: 10}}/>경조
                                    <input 
                                        type="radio" 
                                        value="질병" 
                                        checked={selectedOption==='질병'} 
                                        onChange={onchangeHandler}
                                        style={{marginLeft: 10}}/>질병
                                <div style={{marginLeft: 150}}>
                                </div>
                            </div>
                        </div>
                        <div className={ApvVacationDocCSS.text3}>
                            <div className={ApvVacationDocCSS.title2} >
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
                        <div className={ApvVacationDocCSS.context}>
                            <div className={ApvVacationDocCSS.title} >
                                연차일수
                            </div>
                        </div>
                        <button 
                            onClick={onClickConfirm}
                            className={ApvVacationDocCSS.check}>확인</button>
                    </div>
                    {/* 신청 사유 작성 */}
                    <div className={ApvVacationDocCSS.context2}>신청사유
                    </div>
                    {/* 텍스트 박스 생성 */}
                        <input 
                            type="textbox"
                            className={ApvVacationDocCSS.textbox}
                            onChange={onChangeTextHandler}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default ApvVacationDoc;