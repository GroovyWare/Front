import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RequestListCSS from "./RequestList.module.css";
import PagingBar from "../../../components/common/PagingBar";
import { searchWaitAPI } from "../../../api/ApprovalAPICall";
import { searchNowAPI } from "../../../api/ApprovalAPICall";

function RequestWait(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {waitList} = useSelector(state => state.approvalReducer);
    const {now} = useSelector(state => state.approvalReducer);
    const pageInfo = waitList?.pageInfo;

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
                    const approvedApvNumTwo = wait.approveLine.find(approve => approve.aplNum === '2')?.aplStatus === '승인';
                    const approvedApvNumThree = wait.approveLine.find(approve => approve.aplNum === '3')?.aplStatus === '승인';
                    const shouldDisplay = (wait.approveLine.find(approve => approve.aplNum === 1) && approvedApvNumTwo && approvedApvNumThree) ||
                                          (wait.approveLine.find(approve => approve.aplNum === 2) && approvedApvNumThree);
    
                    if (!shouldDisplay) {
                        return null;
                    }
    
                    return (
                        <tr key={waitIndex} onClick={() => onRowClickHandler(wait.apvCode)}>
                            <td>{wait.employee.empName}</td>
                            <td>{wait.apvCreatedDate}</td>
                            <td>{wait.apvEndDate}</td>
                            <td>{wait.document.docTitle}</td>
                            <td style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                {wait.approveLine.map((apv, index2) => (
                                    now?.data.empCode === apv.empCode ? <div key={index2}>{apv.aplStatus}</div> : null
                                ))}
                            </td>
                        </tr>
                    );
                })}
            </table>
            <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div>
        </div>
    )}
    
    export default RequestWait;