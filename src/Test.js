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
                                <div style={{marginLeft: 150}}>
                                </div>
                            </div>
                        </div>
                        <div style={{borderBottom : "solid black 1px", width: 600, height: 50, fontFamily :"LINESeedKR-Bd", color: "#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 25, paddingTop: 10}} >
                                기간 및 일시
                            </div>
                        </div>
                        <div style={{ fontFamily:"LINESeedKR-Bd", color:"#505050", fontSize: 18}}>
                            <div style={{paddingLeft: 40, paddingTop: 10}} >
                                연차일수
                            </div>
                        </div>
                    </div>
                    <div style={{fontFamily:"LINESeedKR-Bd", color: "#505050",  fontSize: 22,  textAlign: "center" ,marginTop: 20}}>신청사유
                    </div>
                        <div
                            style={{width: 500, height: 300, marginLeft: 50, marginTop:30, fontFamily:"LINESeedKR-Bd", color: "#505050",
                                fontSize: 14, textAlign: "center"}}
                        >
                            {/* {vacContext} */}
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Test;
