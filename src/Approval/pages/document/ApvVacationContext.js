import { useLocation } from "react-router-dom";
import ApvVacationCSS from "./ApvVacation.module.css";

function ApvVacationContext(){

    const location = useLocation()
    const {selectedOption, vacStartDate, vacEndDate, vacContext} = location.state;

    return(
        <>
        <div className={ApvVacationCSS.normal}>
            <div className={ApvVacationCSS.normals}>
                <div className={ApvVacationCSS.document}>휴가신청서</div>
                {/* 표 그리기 */}
                <div className={ApvVacationCSS.text}>
                    <div className={ApvVacationCSS.text2}>
                        <div className={ApvVacationCSS.text3}>
                            {/* 표 제목 그리기 */}
                            <div className={ApvVacationCSS.title} >
                                휴가종류
                                {/* 라디오 버튼 선택 */}
                                <div style={{marginLeft:150, marginTop: -15}}>
                                    {selectedOption}
                                </div>
                            </div>
                        </div>
                        <div className={ApvVacationCSS.text3}>
                            <div className={ApvVacationCSS.title2} >
                                기간 및 일시
                                {/* 기간 선택 */}
                                <div style={{marginLeft:150, marginTop: -15}}>
                                    {vacStartDate} ~ {vacEndDate}
                                </div>
                            </div>
                        </div>
                        <div className={ApvVacationCSS.context}>
                            <div className={ApvVacationCSS.title} >
                                연차일수
                            </div>
                        </div>
                    </div>
                    {/* 신청 사유 작성 */}
                    <div className={ApvVacationCSS.context2}>신청사유
                    </div>
                    {/* 텍스트 박스 생성 */}
                    <div className={ApvVacationCSS.textbox}>
                        {vacContext}
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default ApvVacationContext;