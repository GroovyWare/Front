
function PassItem({ passLists }) {

    return(
        <>
        <div>
            <div>회원 조회</div>
            </div>
            <div>
                <tr>
                    <div>
                        <div><th>번호</th></div>
                        <div><th>종류</th></div>
                        <div><th>가격</th></div>
                        <div><th>횟수</th></div>
                        <div><th>비고</th></div>
                    </div>
                </tr>
            </div>

        <div>
                <div> 
                    <div><th>{ passLists.passCode }</th></div>
                    <div><th>{ passLists.passType }</th></div>
                    <div><th>{ passLists.passAmount }</th></div> 
                    <div><th>{ passLists[0] && passLists[0].passEtc}</th></div>
                </div>

        </div>
        
        </>
    );



}

export default PassItem;