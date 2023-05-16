import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceListAPI, callAnnounceSearchListAPI } from "../../../api/AnnounceAPICalls";
import AnnounceList from "./AnnounceList";
import PagingBar from "../../../components/common/PagingBar";
import { useSearchParams } from "react-router-dom";

function AnnounceMain() {

    const dispatch = useDispatch();
    const announces = useSelector(state => state.announceReducer);
    const announceList = announces.data;
    const pageInfo = announces.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');

    useEffect(
        () => {
            if(search) {
                /* 검색어에 해당하는 음식에 대한 요청 */
                dispatch(callAnnounceSearchListAPI({ search, currentPage }));
            } else {
                /* 모든 음식에 대한 요청 */
                dispatch(callAnnounceListAPI({ currentPage }));
            }
            
        },
        [dispatch]
    );

    return (
        <>  
            <div>
                { announceList && <AnnounceList announceList={announceList} /> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </>
    );
}

export default AnnounceMain;
