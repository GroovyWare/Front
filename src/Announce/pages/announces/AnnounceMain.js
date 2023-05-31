import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceListAPI, callAnnounceSearchListAPI } from "../../../api/AnnounceAPICalls";
import AnnounceList from "./AnnounceList";
import PagingBar from "../../../components/common/PagingBar";
import { Navigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../../components/common/SearchBar";
import AnnounceMainCSS from './AnnounceMain.module.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";

function AnnounceMain() {

    const dispatch = useDispatch();
    // const userRole = useSelector('state => state.authCode'); // 이 부분은 실제 authCode를 가져오는 Redux Selector로 변경해야 합니다.
    const [userRole, setUserRole] = useState('1'); // 임의의 userRole 상태 생성
    const announces = useSelector(state => state.announceReducer);
    const navigate = useNavigate();
    const announceList = announces?.data || [];
    const pageInfo = announces?.pageInfo || null;

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    const [searchTerm, setSearchTerm] = useState(search || '');

    useEffect(
        () => {
            if(searchTerm) {
                dispatch(callAnnounceSearchListAPI({ search: searchTerm, currentPage }));
            } else {
                dispatch(callAnnounceListAPI({ currentPage }));
            }
        },
        [dispatch, currentPage, searchTerm]
    );

    const displayTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
    
        if (diffInSeconds < 60) {
            return `${diffInSeconds}초 전`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)}분 전`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)}시간 전`;
        } else {
            const year = date.getFullYear().toString().substr(2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    };

    const goToRegistration = () => {
        navigate("/announce/announce-registration");
    }

    const onSearch = (searchValue) => {
        setSearchTerm(searchValue);
    }

    return (
        <>  
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px", marginRight: "20px" }}>
                <SearchBar search={searchTerm} onSearch={onSearch} />
            </div>
            <div className={ AnnounceMainCSS.bodyDiv }>
            <table className={ AnnounceMainCSS.productTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="75%" />
                    <col width="10%" />
                    <col width="10%" />
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
                    {announceList.map((p) => (
                        <tr key={p.annCode}>
                            <td>{p.annCode}</td>
                            <td>
                            <NavLink to={`/announce/${p.annCode}`} className="announce-link">
                                {p.annTitle}
                            </NavLink>
                            </td>
                            <td>{p.employee.empName}</td>
                            <td>{displayTimeAgo(p.annDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                { announceList.length > 0 && <AnnounceList announceList={announceList} /> }
            </div>
            <div className={ AnnounceMainCSS.buttonDiv }>
                {userRole === '1' && <button onClick={ goToRegistration }>등록</button>}
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
        </>
    );
}

export default AnnounceMain;
