import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAnnounceListForAdminAPI } from "../../api/AnnounceAPICalls";
import PagingBar from "../../../components/common/PagingBar";
import AnnounceManagementCSS from './AnnounceManagement.module.css';

function AnnounceManagement() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector(state => state.announceReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callAnnounceListForAdminAPI({currentPage}));
        },
        [currentPage]
    );

    const onClickTableTr = (annCode) => {
        navigate(`/announce-update/${annCode}`);
    }

    const onClickAnnounceInsert = () => {
        navigate("/announce-registration");
    }

    const onClickAnnounceDelete = () => {
        navigate("/announce-delete");
    }

    return (
        <div className={ AnnounceManagementCSS.bodyDiv }>
            <div className={ AnnounceManagementCSS.buttonDiv }>
                <button onClick={ onClickAnnounceInsert }>글쓰기</button>
                <button onClick={ onClickAnnounceDelete }>글삭제</button>
            </div>
            <table className={ AnnounceManagementCSS.productTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="70%" />
                    <col width="10%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map(p => 
                        (<tr
                            key={ p.annCode }
                            onClick={ () => onClickTableTr(p.annCode) }
                        >
                            <td>{ p.annCode }</td>
                            <td>{ p.annTitle }</td>
                            <td>{ p.employee.empName }</td>
                            <td>{ p.annDate }</td>
                        </tr>))
                    }
                </tbody>
                </table>
                <div>
                    { pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/> }
                </div>
        </div>
    );
}

export default AnnounceManagement;