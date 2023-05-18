import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMemberDetailAPI } from "../../api/MemberAPICalls";
import { callMemberHistoryCheckAPI } from "../../api/MemberHistoryAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import MemberHistoryModal from "./MemberHistoryModal";




function MemberDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.memberReducer);
    const { history } = useSelector((state) => state.historyReducer);
    const params = useParams();
    const memCode = params.memCode;
    const [memberHistoryModal, setMemberHistoryModal] = useState(false);
    

    useEffect(() => {
        dispatch(callMemberDetailAPI({ memCode }));
    },[]);

    /* 이력 유무에 따라 Modal 띄우기 */
    useEffect(() => {
            if(history?.memCode){
                setMemberHistoryModal(true);
            } else if(history) {
                setMemberHistoryModal(true);
            }
        },
        [history]);

    /* 회원 이력 상세 보기 버튼 */
    const onClickHistoryHandler = (memCode) => {
        /* 이력 유무 확인 */
        dispatch(callMemberHistoryCheckAPI({memCode}));
        setMemberHistoryModal(memCode);
    };

    /* 수정하기 버튼 */
    const onClickModifyHandler = () => {
        navigate(`modify/${params.memCode}`)
    }

    /* 취소하기(페이지로 돌아가기) 버튼 */
    const onClickCancelHandler = () => {
        navigate(`/member`)
    }
    return(
        <>
        <div>회원 페이지</div>
        {memberHistoryModal ? (
            <MemberHistoryModal
                history={history}
                setMemberHistoryModal={setMemberHistoryModal}
            />
        ) : true}

            <div>
                {member.memCode && (
                  <>
                    <table>
                        <tbody>
                            <tr>회원번호 { member.memCode }</tr>
                            <tr>이름 { member.memName }</tr>
                            <tr>전화번호 { member.memPhone }</tr>
                            <tr>회원권 { member.memPhone }</tr>
                            <div>
                              <button
                                onClick={ () => 
                                    onClickHistoryHandler(member.memCode)
                                }
                              >
                                상세보기</button>
                            </div>
                            <tr>시작일 { member.memStartDate }</tr>
                            <tr>종료일 { member.memEndDate }</tr>
                            <tr>삭제일 { member.memDeleteDate }</tr>
                            <tr>비고 { member.memEtc }</tr>
                        </tbody>
                    </table>

                    <div>
                        <button onClick={ onClickModifyHandler }>수정하기</button>
                        <button onClick={ onClickCancelHandler }>취소하기</button>
                    </div>
                  </>
                )}
            </div>
        
        </>
    );
}


                     

export default MemberDetail;




