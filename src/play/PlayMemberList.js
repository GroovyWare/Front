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

    const dispatch = useDispatch();

    useEffect(
        () => {
                dispatch(selectPlayMember({currentPage}));
        },[currentPage]
    )

    return(
        <>
            <div className={PlayMemberListCSS.wrap}>
                <div className={PlayMemberListCSS.title}>박민경 트레이너의 회원 목록</div>
                <>
                    { memberList && memberList.data.data.map((member => (
                        <div>
                            {member.memName}
                            {member.history && member.history.map((history) => (
                               <>
                                    {history.pass.passType}
                                    {history.resStart} ~ {history.resEnd}
                               </>
                            ))}
                        </div>
                    )))}
                </>
            </div>
            <div>
                {memberList && <PagingBar pageInfo={memberList.data.pageInfo} setCurrentPage={setCurrentPage}/>}
            </div>
        </>
    )
}

export default PlayMemberList;