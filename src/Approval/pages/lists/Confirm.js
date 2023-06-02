import ConfirmCSS from './Confirm.module.css';

function Confirm(){

    return(
        <div className={ConfirmCSS.container}>
            <table className={ConfirmCSS.table}>
                <tr>
                    <th>기안일</th>
                    <th>마감일</th>
                    <th>기안서명</th>
                    <th>결재권자</th>
                    <th>상태</th>
                </tr>
            </table>
            {/* <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div> */}
        </div>
    )
}

export default Confirm;