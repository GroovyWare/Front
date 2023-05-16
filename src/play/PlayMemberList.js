import { useDispatch, useSelector } from 'react-redux';
import PlayMemberListCSS from './PlayMemberList.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PagingBar from "../components/common/PagingBar";
import { selectPlayMember } from '../api/PlayAPICall';
import MemberPlayList from './lists/MemberPlayList';

function PlayMemberList(){

    const [currentPage, setCurrentPage] = useState(1);
    const {memberList} = useSelector(state => state.playReducer);
    // const pageInfo = memberList.pageInfo;
    // const memberPlayList = memberList.data;
    const params = useParams();
    const empCode = params.empCode;

    const dispatch = useDispatch();

    useEffect(
        () => {
                dispatch(selectPlayMember({empCode, currentPage}));
        },[currentPage]
    )

    console.log('memberlist', memberList)

    return(
        <>
            <div className={PlayMemberListCSS.wrap}>
                <div className={PlayMemberListCSS.title}>박민경 트레이너의 회원 목록</div>
            </div>
                {/* { memberPlayList && <MemberPlayList memberPlayList = {memberPlayList}/>} */}
            <div>
                {/* {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>} */}
            </div>
        </>
    )
}

export default PlayMemberList;