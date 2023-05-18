

function MemberHistoryModal({ history, setMemberHistoryModal }) {
    const onClickHandler = () => {
        setMemberHistoryModal(false);
    };

    return(
        <>
            <h1>회원 활동이력 상세조회</h1>
            <button
                onClick={onClickHandler}
            >돌아가기</button>
        </>
    );

}

export default MemberHistoryModal;