
function PassItem({ pass : { passCode, passAmount, passEtc, passType, passPrice} }) {

    return(
        <>

        <div>
                <tr>
                    <td>번호</td>
                    <td>종류</td>
                    <td>가격</td>
                    <td>횟수</td>
                    <td>비고</td>
                </tr>
                <tr>
                    <td>{ passCode }</td>
                    <td>{ passType }</td>
                    <td>{ passPrice }</td>
                    <td>{ passAmount }</td> 
                    <td>{ passEtc}</td>
                </tr>
        </div>
            
        
        
        </>
    );



}

export default PassItem;