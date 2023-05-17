import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMemberDetailAPI } from "../../api/MemberAPICalls";
import { useNavigate, useParams } from "react-router-dom";




function MemberDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.memberReducer);
    const params = useParams();
    const memCode = params.memCode;
    

    useEffect(() => {
        dispatch(callMemberDetailAPI({ memCode }));
    },[]);

    /* 회원 이력 상세 보기 버튼 */
    const onClickHistoryHandler = () => {
        navigate(`/member/log/${params.memCode}`)
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
                                onClick={onClickHistoryHandler}
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




