import ReactDOMServer from 'react-dom/server';

function Test(){

    return(
        <>
        <div style={{ display : "flex", marginBottom:40}}>
            <div style={{ height:800, width: 700, border: "solid black 1px",  marginLeft : 40, marginTop: 30, marginBottom :80}}>
                <div style={{ textAlign : "center", marginTop:30, fontFamily: "LINESeedKR-Bd", color: "#505050", fonSize: 22}}>휴가신청서</div>
                <div style={{ height:150, width: 600, border: "solid black 1px", marginLeft : 45, marginTop: 30}}>
                    <div style={{bordeRight: "solid black 1px", width: 150, height:150}}>
                        <div style={{borderBottom : "solid black 1px", width: 600, height: 50, fontFamily :"LINESeedKR-Bd", color: "#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 40, paddingTop: 10}} >
                                휴가종류
                                <input 
                                        type="radio" 
                                        value="연차" 
                                        style={{marginLeft: 60}}
                                        />연차
                                    <input 
                                        type="radio" 
                                        value="반차" 
                                        style={{marginLeft: 10}}/>반차
                                    <input 
                                        type="radio" 
                                        value="경조" 
                                        style={{marginLeft: 10}}/>경조
                                    <input 
                                        type="radio" 
                                        value="질병" 
                                        style={{marginLeft: 10}}/>질병
                                <div style={{marginLeft: 150}}>
                                </div>
                            </div>
                        </div>
                        <div style={{borderBottom : "solid black 1px", width: 600, height: 50, fontFamily :"LINESeedKR-Bd", color: "#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 25, paddingTop: 10}} >
                                기간 및 일시
                                <input
                                    type="date"
                                    style={{marginLeft: 50}}
                                    />  ~  
                                <input
                                    type="date"
                                    style={{marginLeft: 10}}
                                />
                            </div>
                        </div>
                        <div style={{ fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 40, paddingTop: 10}} >
                                연차일수
                            </div>
                        </div>
                        <button 
                            style={{ marginTop: 30, marginLeft: 550, width: 50, backgroundColor: "#1A1779", 
                                color:"white"}}>확인</button>
                    </div>
                    <div style={{fontFamily:"LINESeedKR-Bd", color: "#505050",  fontSize: 22,  textAlign: "center" ,marginTop: 20}}>신청사유
                    </div>
                        <input 
                            type="textbox"
                            style={{width: 500, height: 300, marginLeft: 50, marginTop:30, fontFamily:"LINESeedKR-Bd", color: "#505050",
                                fontSize: 14, textAlign: "center"}}
                        />
                </div>
            </div>
        </div>
        </>
    )
}

export default Test;
