import MemberHistoryModalCSS from "./MemberHistoryModal.module.css";

function MemberHistoryModal({ history, setMemberHistoryModal }) {
    const onClickHandler = () => {
        setMemberHistoryModal(false);
    };


    return(
        <>
            <div className={MemberHistoryModalCSS.modal}>
              <div>
               
                 <div className={MemberHistoryModalCSS.modalContainer}>
                 <div className={MemberHistoryModalCSS.modalTitle}>
                    회원 활동이력 상세조회
                </div>
                
                <div className={MemberHistoryModalCSS.modalTable}>
                 <table>
                   <tbody>
                   <tr className={MemberHistoryModalCSS.modalTr}> 
                        <td>회원권</td>
                        <td>횟수</td>
                        <td>담당자</td>
                        <td>시작일</td>
                        <td>종료일</td>
                   </tr>

                   <tr>
                    <td>{ history && history.data[0].pass.passType }</td>
                    <td>{ history && history.data[0].pass.passAmount }</td>
                    <td>{ history && history.data[0].employee.empName }</td>
                    <td>시작일</td>
                    <td>종료일</td>
                   </tr>
                   </tbody>
                 </table>
                 </div>
                 <button
                    onClick={onClickHandler}
                >돌아가기</button>
                 </div>
               </div>


            </div>
        </>
    );
}

export default MemberHistoryModal;