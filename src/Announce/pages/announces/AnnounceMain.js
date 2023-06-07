import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceListAPI, callAnnounceSearchListAPI } from "../../../api/AnnounceAPICalls";
import AnnounceList from "./AnnounceList";
import PagingBar from "../../../components/common/PagingBar";
import { useSearchParams } from "react-router-dom";
import AnnounceSearchBar from "./AnnounceSearchBar";
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

    const [sortConfig, setSortConfig] = useState(null);
    const [sortedAnnounceList, setSortedAnnounceList] = useState([]);
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

    useEffect(() => {
        let sortableItems = [...announceList];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key.includes('.')) {
                    // Split the key
                    const keys = sortConfig.key.split('.');
                    // Access the inner property
                    const propA = a[keys[0]][keys[1]];
                    const propB = b[keys[0]][keys[1]];
    
                    // Sort
                    if (propA < propB) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (propA > propB) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                } else if (sortConfig.key === 'annDate') {
                    // 날짜에 대한 정렬 처리
                    const dateA = Date.parse(a[sortConfig.key]);
                    const dateB = Date.parse(b[sortConfig.key]);
                    return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
                } else {
                    // 문자열에 대한 정렬 처리
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        setSortedAnnounceList(sortableItems); // 상태 업데이트
    }, [announceList, sortConfig]);
    

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

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
        <div className={ AnnounceMainCSS.container }>
            <div className={ AnnounceMainCSS.pageTitle }>공지사항</div>
            <div>
                <AnnounceSearchBar onSearch={onSearch} />
            </div>
            <div className={ AnnounceMainCSS.content }>
            <table className={ AnnounceMainCSS.annTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="75%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th onClick={() => handleSort('annTitle')}>제목</th>
                        <th onClick={() => handleSort('employee.empName')}>작성자</th>
                        <th onClick={() => handleSort('annDate')}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAnnounceList.map((p) => (
                        <tr key={p.annCode}>
                            <td>{p.annCode}</td>
                            <td>
                            <NavLink to={`/announce/${p.annCode}`} className={ AnnounceMainCSS.link } style={{ color: 'black', textDecoration: 'none', display: 'block' }}>
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
        </div>
            <div className={ AnnounceMainCSS.registBtn }>
                {userRole === '1' && <button onClick={ goToRegistration }>등록</button>}
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
    );
}

export default AnnounceMain;
