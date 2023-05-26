import React, { useState } from 'react';
import EquipmentModal from './EquipmentModal'; // 수정을 위한 모달 컴포넌트를 여기에 임포트 합니다.

const EquipmentItem = ({ equipment }) => {
    const [showModal, setShowModal] = useState(false); // 모달을 보여줄지 말지를 결정하는 상태

    const onClickHandler = () => {
        setShowModal(true); // 아이템 클릭 시 모달을 보여주도록 설정
    };

    const closeModal = () => {
        setShowModal(false); // 모달 닫기 함수
    };

    return (
        <>
            <tr onClick={onClickHandler}>
                <td>{equipment.eqpTitle}</td>
                <td>{equipment.eqpPurchase}</td>
                <td>{equipment.empCode}</td>
                <td>{equipment.eqpDate}</td>
                <td>{equipment.eqpStatus}</td>
            </tr>
            {showModal && <EquipmentModal equipment={equipment} closeModal={closeModal} />} 
            {/* 만약 showModal이 true라면 EquipmentModal을 보여줍니다. */}
        </>
    );
};

export default EquipmentItem;
