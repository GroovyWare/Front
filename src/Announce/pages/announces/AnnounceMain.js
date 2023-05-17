import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceListAPI, callAnnounceSearchListAPI } from "../../../api/AnnounceAPICalls";
import AnnounceList from "./AnnounceList";
import PagingBar from "../../../components/common/PagingBar";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../../components/common/SearchBar"; // SearchBar 컴포넌트를 가져옵니다.

function AnnounceMain() {

    const dispatch = useDispatch();
    const announces = useSelector(state => state.announceReducer);

    const announceList = announces?.data || [];
    const pageInfo = announces?.pageInfo || null;

    const [currentPage, setCurrentPage] = useState(1);
    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');

    // 검색 기능을 위한 상태를 추가합니다.
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(
        () => {
            if(searchTerm) {
                /* 검색어에 해당하는 공지사항에 대한 요청 */
                dispatch(callAnnounceSearchListAPI({ search: searchTerm, currentPage }));
            } else {
                /* 모든 공지사항에 대한 요청 */
                dispatch(callAnnounceListAPI({ currentPage }));
            }
            
        },
        [dispatch, currentPage, searchTerm]  // searchTerm을 의존성 배열에 추가
    );

    // 검색 함수를 구현합니다.
    const onSearch = (searchValue) => {
        setSearchTerm(searchValue);
    }

    return (
        <>  
            <SearchBar onSearch={onSearch} />
            <div>
                { announceList.length > 0 && <AnnounceList announceList={announceList} /> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </>
    );
}

export default AnnounceMain;
