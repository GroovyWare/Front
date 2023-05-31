import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function EquipmentItem({ equipment }) {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();

    const onClickEquipmentHandler = () => {
        setShowModal(true);
    };

    // 모달 바깥 부분 클릭 시 모달 닫기
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modalRef.current || modalRef.current.contains(target)) return;
            setShowModal(false);
        };
        document.addEventListener('mousedown', clickHandler);
        return () => document.removeEventListener('mousedown', clickHandler);
    });

    return (
        <div onClick={onClickEquipmentHandler}>
            {/* 기구 정보 출력 */}
            <div>
                <h3>{equipment.eqpName}</h3>
                <p>{equipment.manufacturer}</p>
            </div>
            {/* 모달 창 */}
            {showModal && (
                <div ref={modalRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '1em', zIndex: 1000 }}>
                    {/* 세부 정보 출력 */}
                    <h2>{equipment.eqpName}</h2>
                    <p>{equipment.manufacturer}</p>
                    <p>{equipment.status}</p>
                    <p>{equipment.regDate}</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
            {/* 모달 창 뒷 배경 */}
            {showModal && <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}></div>}
        </div>
    );
}

export default EquipmentItem;
