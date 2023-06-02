import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMemberDetailAPI } from "../../api/MemberAPICalls";
import { callMemberHistoryCheckAPI } from "../../api/MemberHistoryAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import MemberHistoryModal from "./MemberHistoryModal";
import MemberDetailCSS from "./MemberDetail.module.css";
import { addYears, format } from "date-fns";


function MemberDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.memberReducer);
    const { history } = useSelector(state => state.historyReducer);
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
                setMemberHistoryModal(false);
            }
        },
        []);

        
    /* 회원 이력 상세 보기 버튼 */
    const onClickHistoryHandler = ( memCode ) => {
        /* 이력 유무 확인 */
        dispatch(callMemberHistoryCheckAPI({memCode}));
        setMemberHistoryModal(memCode);
    };

    /* 수정하기 버튼 */
    const onClickModifyHandler = () => {
        navigate(`/member/modify/${memCode}`)
    }

    /* 회원권 추가하기 버튼 */
    const onClickAddPassHandler = () => {
        navigate(`/history/add/${memCode}`)
    }

    /* 취소하기(페이지로 돌아가기) 버튼 */
    const onClickCancelHandler = () => {
        navigate(`/member`)
    }

    const resEndDate = member.memCode && member.history[0]?.resEnd;
    const memDeleteDate = resEndDate ? format(addYears(new Date(resEndDate), 5), 'yyyy-MM-dd') : '';

    
    return(
        <>
        <div className={MemberDetailCSS.pageTitle}>회원 상세조회</div>
        
        <div className={MemberDetailCSS.contentWrap}>
        {memberHistoryModal ? (
            <MemberHistoryModal
                history={history}
                setMemberHistoryModal={setMemberHistoryModal}
            />
        ) : true}

                {member.memCode && member.history && member.history.length > 0 && (
                        
                  <>
                    <table className={MemberDetailCSS.contentTb}>
                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>회원번호</td> 
                            <td className={MemberDetailCSS.contentText} colspan="3">{ member.memCode }</td>
                        </tr>
                        
                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>이름</td>
                            <td className={MemberDetailCSS.contentText} colspan="3">{ member.memName }</td>
                        </tr>

                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>전화번호</td>
                            <td className={MemberDetailCSS.contentText} colspan="3">{ member.memPhone }</td>
                        </tr>

                        <tr>
                            <td className={MemberDetailCSS.contentTitle} colspan="2">회원권</td>
                            <td className={MemberDetailCSS.contentText}>{ member.history[0].pass.passType }</td>
                            <td className={MemberDetailCSS.contentText} >
                                <button
                                    className={MemberDetailCSS.detailBtn}
                                    onClick={ () => 
                                        onClickHistoryHandler(member.memCode)
                                    }
                                >
                                    상세보기</button>
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>시작일</td>
                            <td className={MemberDetailCSS.contentText} colspan="3">{ member.history[0].resStart }</td>
                        </tr>

                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>종료일</td> 
                            <td className={MemberDetailCSS.contentText} colspan="3">{ member.history[0].resEnd }</td>
                        </tr>

                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>삭제일</td> 
                            <td className={MemberDetailCSS.contentText} colspan="3">{ memDeleteDate }</td>
                        </tr>

                        <tr>
                            <td className={MemberDetailCSS.contentTitle}>비고</td>
                            <td className={MemberDetailCSS.contentText} colspan="3">{ member.memEtc }</td>
                        </tr>
                        
                    </table>

                    <div className={MemberDetailCSS.btnWrap}>
                    <div>
                        <button 
                            className={MemberDetailCSS.modifyBtn}
                            onClick={ onClickModifyHandler }>회원정보수정</button>
                    </div>
                    <div>
                        <button 
                            className={MemberDetailCSS.addPassBtn}
                            onClick={ onClickAddPassHandler }>회원권추가</button>
                    </div>
                    <div>
                        <button 
                            className={MemberDetailCSS.cancelBtn}
                            onClick={ onClickCancelHandler }>취소하기</button>
                    </div>
                    </div>

                
                  </>
                )}
            </div>

        </>
    );
}


export default MemberDetail;