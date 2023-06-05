import { useDispatch, useSelector } from 'react-redux';
import ConfirmCSS from './Confirm.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PagingBar from '../../../components/common/PagingBar';
import { searchListAPI, searchNowAPI } from '../../../api/ApprovalAPICall';

function Confirm(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {list, now} = useSelector(state => state.approvalReducer);
    const pageInfo = list?.data.pageInfo;

    const [ currentPage, setCurrentPage ] = useState(1);

    const onRowClickHandler = (apvCode) => {
        navigate("/approval/detail", {state : {apvCode : apvCode}, replace : true});
    }

    useEffect(
        () => {
            dispatch(searchListAPI({currentPage}));
        },[currentPage]
    )

    useEffect(
        () => {
            dispatch(searchNowAPI());
        },[]
    )

    return(
        <>
        <div className={ConfirmCSS.container}>
            <div className={ConfirmCSS.pageTitle}>
                <div>종결함</div>
            </div>
            <div className={ConfirmCSS.content}>
        <div className={ConfirmCSS.tableDiv}>
            <table className={ConfirmCSS.table}>
                <tr>
                    <th>기안자</th>
                    <th>기안일</th>
                    <th>마감일</th>
                    <th>기안서명</th>
                    <th>상태</th>
                </tr>

                {list && list.data.data.map((wait, waitIndex) => {

                    if(wait.apvStatus === '승인'){
                            return (
                                <tr key={waitIndex} onClick={() => onRowClickHandler(wait.apvCode)}>
                                    <td>{wait.employee.empName}</td>
                                    <td>{wait.apvCreatedDate}</td>
                                    <td>{wait.apvEndDate}</td>
                                    <td>{wait.document.docTitle}</td>
                                    <td style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                    {wait.apvStatus}
                                    </td>
                                </tr>
                            );
                }})}
            </table>
            </div>
            </div>
            </div>
            <div>{ pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }</div>
            </>
    )
}

export default Confirm;