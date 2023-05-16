import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMemberListAPI } from "../../api/MemberAPICalls";
import MemberList from "./MemberList";
import PagingBar from "../../components/common/PagingBar";



function MemberMain() {

    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members.data;
    const pageInfo = members.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            /* 전체 메뉴 요청 */
            dispatch(callMemberListAPI({ currentPage }));
        },
        [currentPage]
    );


    return(
        <>
            <div>
                { memberList && <MemberList memberList={memberList}/> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage}/> }
            </div>

        </>
    );
}

export default MemberMain;