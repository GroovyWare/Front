import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMemberListAPI, callMemberSearchListAPI } from "../../api/MemberAPICalls";
import MemberList from "./MemberList";
import PagingBar from "../../components/common/PagingBar";
import { useSearchParams } from "react-router-dom";
import MemberListCSS from "./MemberList.module.css";



function MemberMain() {

    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members.data;
    const pageInfo = members.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    /* 회원명 검색 요청 시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');

    useEffect(
        () => {
            if(search){
            /* 회원명 검색에 대한 요청 */
            dispatch(callMemberSearchListAPI({currentPage}));    
        } else {
            /* 전체 회원 요청 */
            dispatch(callMemberListAPI({ currentPage }));
        }
            
        },
        [currentPage]
    );


    return(
        <>
            <div>
                { memberList && <MemberList memberList={memberList}/> }
            </div>

            <div>
            <hr className={MemberListCSS.bottonLine}></hr>
            </div>

            <div className={MemberListCSS.paging}>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage}/> }
            </div>
                
        </>
    );
}

export default MemberMain;