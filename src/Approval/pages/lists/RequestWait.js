import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RequestListCSS from "./RequestList.module.css";
import PagingBar from "../../../components/common/PagingBar";
import { searchWaitAPI } from "../../../api/ApprovalAPICall";
import { searchNowAPI } from "../../../api/ApprovalAPICall";

function RequestWait(){
    let visibleRowCount = 0;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {waitList} = useSelector(state => state.approvalReducer);
    const {now} = useSelector(state => state.approvalReducer);
    const pageInfo = waitList?.data.pageInfo;

    const [ currentPage, setCurrentPage ] = useState(1);

    /* 목록 */
    useEffect(
        () => {
            dispatch(searchWaitAPI({currentPage}));
        },[currentPage]
    )

    useEffect(
        () => {
            dispatch(searchNowAPI());
        },[]
    )

    const onRowClickHandler = (apvCode) => {
        navigate("/approval/waitDetail", {state : {apvCode : apvCode}});
    }

    return (
        <>
        <div>
            <h3 className={RequestListCSS.container}>결재 대기</h3>
        <div className={RequestListCSS.tableDiv}>
            <table className={RequestListCSS.table}>
                <tr>
                    <th>기안자</th>
                    <th>기안일</th>
                    <th>마감일</th>
                    <th>기안서명</th>
                    <th>상태</th>
                </tr>
                {waitList && waitList.data.data.map((wait, waitIndex) => {

                    if(!(wait.apvStatus === '승인' || wait.apvStatus === '반려')){
                    const aplNumOne = wait.approveLine.find(apl => apl.empCode === now.data.empCode);

                    if(aplNumOne?.aplNum === '1'){
                        const aplNumTwo = wait.approveLine.find(apl => apl.aplNum === '2');
                        const aplNumThree = wait.approveLine.find(apl => apl.aplNum === '3');


                        if(aplNumTwo?.aplStatus === '승인' && aplNumThree?.aplStatus === '승인'){
                            visibleRowCount++;
                            return (
                                <tr key={waitIndex} onClick={() => onRowClickHandler(wait.apvCode)}>
                                    <td>{wait.employee.empName}</td>
                                    <td>{wait.apvCreatedDate}</td>
                                    <td>{wait.apvEndDate}</td>
                                    <td>{wait.document.docTitle}</td>
                                    <td style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                       {aplNumOne.aplStatus}
                                    </td>
                                </tr>
                            );
                    }}

                    if(aplNumOne?.aplNum === '2'){
                        const aplNumThree = wait.approveLine.find(apl => apl.aplNum === '3');

                        if(aplNumThree?.aplStatus === '승인'){
                            visibleRowCount++;
                            return (
                                <tr key={waitIndex} onClick={() => onRowClickHandler(wait.apvCode)}>
                                    <td>{wait.employee.empName}</td>
                                    <td>{wait.apvCreatedDate}</td>
                                    <td>{wait.apvEndDate}</td>
                                    <td>{wait.document.docTitle}</td>
                                    <td style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                        {aplNumOne.aplStus}
                                    </td>
                                </tr>
                            );
                    }}

                    if(aplNumOne?.aplNum === '3'){
                        visibleRowCount++;
                            return (
                                <tr key={waitIndex} onClick={() => onRowClickHandler(wait.apvCode)}>
                                    <td>{wait.employee.empName}</td>
                                    <td>{wait.apvCreatedDate}</td>
                                    <td>{wait.apvEndDate}</td>
                                    <td>{wait.document.docTitle}</td>
                                    <td style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                       {aplNumOne.aplStatus} 
                                    </td>
                                </tr>
                            );
                    }
            }})}
            </table>
            
                <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/>}</div>
            </div>
        </div>
        </>
    )}
    
    export default RequestWait;