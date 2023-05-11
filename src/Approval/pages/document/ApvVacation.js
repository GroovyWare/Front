import { useState } from "react";
import { useLocation } from "react-router-dom";


function ApvVacation(){
    
    const location = useLocation();
    const {item, startDate, endDate} = location.state;

    console.log(item)
    console.log(startDate)
    console.log(endDate)

    const [selectedOption, setSelectedOption] = useState();
    const [vacStartDate, setVacStartDate] = useState();
    const [vacEndDate, setVacEndDate] = useState();

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

    return(
        <>
        <div style={{display : "flex", marginBottom: 40}}>
            <div 
            style={{height:800, width: 700, border:"solid black 1px", marginLeft:40, marginTop: 30, marginBottom: 80}}>
                <div 
                style={{textAlign:"center", marginTop:30, fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 22}}>휴가신청서</div>
                {/* 표 그리기 */}
                <div style={{height:150, width: 600, border:"solid black 1px", marginLeft : 45, marginTop: 30}}>
                    <div style={{borderRight:"solid black 1px", width: 150, height:150}}>
                        <div style={{borderBottom:"solid black 1px", width: 600, height: 50, fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 18}}>
                            {/* 표 제목 그리기 */}
                            <div style={{paddingLeft: 40, paddingTop: 10}} >
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
                        <div style={{borderBottom:"solid black 1px", width: 600, height: 50, fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 25, paddingTop: 10}} >
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
                        <div style={{fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 40, paddingTop: 10}} >
                                연차일수
                            </div>
                        </div>
                    </div>
                    {/* 신청 사유 작성 */}
                    <div
                        style={{fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 22, textAlign:"center", marginTop: 20}}
                    >신청사유
                    </div>
                    {/* 텍스트 박스 생성 */}
                        <input 
                            type="textbox"
                            style={{width: 500, height: 300, marginLeft: 50, marginTop:30, fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 14, textAlign: "center"}}/>
                </div>
            </div>

            {/* 결재권자 표시 */}
            
            <div style={{display:"flex"}}>
                <div
                    style={{border:"solid black 1px", width: 80, height:100, marginLeft:400, marginTop:30}}></div>
                <div
                    style={{border:"solid black 1px", width: 80, height:100, marginTop:30}}></div>
                <div
                    style={{border:"solid black 1px", width: 80, height:100, marginTop:30}}></div>
            </div>
        </div>

        {/* 상세 정보 */}
        <div
            style={{backgroundColor:"#EBEAFC", width:600, height:500, marginLeft: 1100, marginTop: -650, marginBottom: 30, borderRadius : 20}}
        >
            <div
                style={{backgroundColor:"#1A1779", color:"white", borderRadius:20, height: 50, fontFamily:"LINESeedKR-Bd",fontSize: 22, textAlign:"center", paddingTop: 20}}
            >상세 정보
            </div>
                <div style={{display:"flex"}}>
                    <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 22, color:"#505050"}}>    
                        <div style={{marginBottom: 30, marginTop: 20, marginLeft: 50}}>제목</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 50}}>보존일</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 50}}>기안자</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 50}}>소속</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 50}}>기안일</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 50}}>열람권자</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 50}}>부서</div>
                    </div>
                    <div style={{fontFamily:"LINESeedKR-Bd",fontSize: 18, color:"#505050"}}>
                        <div style={{marginBottom: 30, marginTop: 20, marginLeft: 70}}>{item}</div>
                        <div style={{marginBottom: 30, marginTop: 40, marginLeft: 70}}>90일</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 70}}>ㅇㅇㅇ</div>
                        <div style={{marginBottom: 30, marginTop: 40, marginLeft: 70}}>ㅇㅇㅇ</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 70}}>[{startDate}] ~ [{endDate}]</div>
                        <div style={{marginBottom: 30, marginTop: 35, marginLeft: 70}}>ooo</div>
                        <div style={{marginBottom: 30, marginTop: 30, marginLeft: 70}}>ooo</div>
                    </div>
                </div>
        </div>
        
        {/* 확인 버튼 */}
            <button
                style={{fontFamily:"LINESeedKR-Bd", color:"white", fontSize: 14, textAlign: "center", width: 50, backgroundColor: "#1A1779", marginLeft: 1300}}
            >제출</button>
            <button
                style={{fontFamily:"LINESeedKR-Bd", color:"white", fontSize: 14, textAlign: "center", width: 50, backgroundColor: "#4A5CFF"}}
            >취소</button>
        </>
    )
}

export default ApvVacation;