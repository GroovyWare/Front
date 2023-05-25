import MemberHistoryModalCSS from "./MemberHistoryModal.module.css";

function MemberHistoryModal({ history, setMemberHistoryModal }) {
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
                   <tr>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ history && history.data[0].pass.passType }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ history && history.data[0].pass.passAmount }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ history && history.data[0].employee.empName }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ history && history.data[0].resStart }</td>
                    <td
                    className={MemberHistoryModalCSS.contentText}
                    >{ history && history.data[0].resEnd }</td>
                   </tr>
                   </tbody>
                 </table>
                
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