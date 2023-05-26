import React, { useState } from 'react';

const EquipmentModalRegist = ({ closeModal }) => {
    const [eqpTitle, setEqpTitle] = useState('');
    const [eqpPurchase, setEqpPurchase] = useState(null);
    const [eqpDate, setEqpDate] = useState(null);
    const [eqpStatus, setEqpStatus] = useState('');

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

    // 기구 정보를 등록하는 함수입니다.
    const registerEquipment = () => {
        // API 호출 또는 redux action을 이용해 서버에 새로운 기구를 등록합니다.
        // ...
        
        closeModal(); // 등록이 완료되면 모달을 닫습니다.
    };

    return (
        <div>
            <h2>Register Equipment</h2>
            <input type="text" value={eqpTitle} onChange={handleTitleChange} />
            {/* 달력 컴포넌트와 textarea 등을 사용하여 필요한 필드를 추가합니다. */}
            <button onClick={registerEquipment}>Register</button>
        </div>
    );
};

export default EquipmentModalRegist;
