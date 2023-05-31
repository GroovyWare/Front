import { useEffect, useState } from "react";
import MemberHistoryModalCSS from "./MemberHistoryModal.module.css";
import { useDispatch } from "react-redux";
import { callMemberHistoryCheckAPI } from "../../api/MemberHistoryAPICalls";
import PagingBar from "../../components/common/PagingBar";


function MemberHistoryModal({ history, setMemberHistoryModal, pageInfo }) {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callMemberHistoryCheckAPI({currentPage}));
        }, 
        [currentPage] 
    );

    const onClickHandler = () => {
        setMemberHistoryModal(false);
    };


    return(
        <>
            <div className={MemberHistoryModalCSS.modal}>
              
               
                <div className={MemberHistoryModalCSS.modalContainer}>
                <div className={MemberHistoryModalCSS.modalTitle}>
                    회원 활동이력 상세조회
                </div>

                <table className={MemberHistoryModalCSS.contentTb}>
                   <thead>
                   <tr className={MemberHistoryModalCSS.contentTitle}> 
                      <td className={MemberHistoryModalCSS.titleTd}>회원권</td>
                      <td className={MemberHistoryModalCSS.titleTd}>횟수</td>
                      <td className={MemberHistoryModalCSS.titleTd}>담당자</td>
                      <td className={MemberHistoryModalCSS.titleTd}>시작일</td>
                      <td className={MemberHistoryModalCSS.titleTd}>종료일</td>
                   </tr>
                   </thead>
                   <tbody>
                    { history && history.data.map(h => 
                    (<tr
                        key={ h.resHistory }
                     >
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ h.pass.passType }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ h.pass.passAmount }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ h.employee.empName }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ h.resStart }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ h.resEnd }</td>
                   </tr>))
                   }
                   </tbody>
                 </table>

                 <div>
                    { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
                </div>
                
                 <button
                    className={MemberHistoryModalCSS.confirmBtn}
                    onClick={onClickHandler}
                >돌아가기</button>
                </div>
            </div>



        </>
    );
}

export default MemberHistoryModal;