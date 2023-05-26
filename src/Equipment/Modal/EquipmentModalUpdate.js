import React, { useState } from 'react';

const EquipmentModalUpdate = ({ equipment, closeModal }) => {
    const [eqpTitle, setEqpTitle] = useState(equipment.eqpTitle);
    const [eqpPurchase, setEqpPurchase] = useState(equipment.eqpPurchase);
    const [eqpDate, setEqpDate] = useState(equipment.eqpDate);
    const [eqpStatus, setEqpStatus] = useState(equipment.eqpStatus);

    // 핸들러 함수를 작성하여 각 필드의 상태를 업데이트합니다.
    const handleTitleChange = (event) => {
        setEqpTitle(event.target.value);
    };

    const handlePurchaseChange = (date) => {
        setEqpPurchase(date);
    };

    const handleDateChange = (date) => {
        setEqpDate(date);
    };

    const handleStatusChange = (event) => {
        setEqpStatus(event.target.value);
    };

    // 기구 정보를 업데이트하는 함수입니다.
    const updateEquipment = () => {
        // API 호출 또는 redux action을 이용해 서버에 변경사항을 업데이트 합니다.
        // ...
        
        closeModal(); // 업데이트가 완료되면 모달을 닫습니다.
    };

    return (
        <div>
            <h2>Update Equipment</h2>
            <input type="text" value={eqpTitle} onChange={handleTitleChange} />
            {/* 달력 컴포넌트와 textarea 등을 사용하여 필요한 필드를 추가합니다. */}
            <button onClick={updateEquipment}>Update</button>
        </div>
    );
};

export default EquipmentModalUpdate;
