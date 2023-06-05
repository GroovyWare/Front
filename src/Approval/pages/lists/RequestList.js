import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRequestAPI } from "../../../api/ApprovalAPICall";
import RequestListCSS from "./RequestList.module.css";
import PagingBar from "../../../components/common/PagingBar";
import { useNavigate } from "react-router-dom";

function RequestList () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {requestList} = useSelector(state => state.approvalReducer);
    const pageInfo = requestList?.pageInfo;

    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(
        () => {
            dispatch(searchRequestAPI({currentPage}));
        },[currentPage]
    )

    const onRowClickHandler = (apvCode) => {
        navigate("/approval/detail", {state : {apvCode : apvCode}, replace : true});
    }

    return(
        <div className={RequestListCSS.container}>
            <div className={RequestListCSS.pageTitle}>
                <div>결재 요청</div>
                <hr/>
            </div>
            <div className={RequestListCSS.tableDiv}>
                <table className={RequestListCSS.table}>
                    <tr>
                        <th>기안일</th>
                        <th>기안서명</th>
                        <th>결재권자</th>
                        <th>상태</th>
                    </tr>
                    {requestList && requestList.data.approvalDtoContent.map((request, requestIndex) => {
                        return ( 
                            <tr key={requestIndex} onClick={() => onRowClickHandler(request.apvCode)}>
                                {request.apvStatus === '진행중' ? 
                                    <>
                                        <td>{request.apvCreatedDate}</td>
                                        <td>{request.document.docTitle}</td>
                                        <td style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                            {requestList && requestList.data.employeeDtoList.map((employee, employeeIndex) => (
                                                request.approveLine.map((approve, approveIndex) => (
                                                    (approve.empCode === employee.empCode) ? 
                                                    <div key={`${requestIndex}-${employeeIndex}-${approveIndex}`}>{employee.empName}</div> : null
                                                ))
                                            ))}
                                        </td>
                                        <td style={{justifyContent: "center", flexDirection: "column"}}>
                                            {request.approveLine.map((approve2, approveIndex2) => (
                                                <div key={approveIndex2}>{approve2.aplStatus}</div>
                                            ))}
                                        </td>
                                    </> : null
                                }
                            </tr>
                        )
                    })}
                </table>
                <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div>
            </div>
        </div>
    )
}
    
    export default RequestList;