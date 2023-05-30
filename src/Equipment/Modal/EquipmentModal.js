import React from 'react';

const EquipmentModal = ({ equipment, closeModal }) => {
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: '1000',
    };

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: '1000',
    };

    return (
        <>
            <div style={overlayStyle} />
            <div style={modalStyle}>
                {/* ...rest of the code */}
                <button onClick={closeModal}>Close</button>
            </div>
        </>
    );
};

export default EquipmentModal;
