import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callEquipmentUpdateAPI } from "../../api/EquipmentAPICalls";
import ReactModal from 'react-modal';
import EquipmentModalCSS from './EquipmentModal.module.css'

const EquipmentUpdate = ({isOpen, onRequestClose, equipment}) => {
    const dispatch = useDispatch();
    const { update } = useSelector(state => state.equipmentReducer);

    // Get current date
    const today = new Date();
    const currentDate = today.toISOString().substring(0,10);

    const [eqpTitle, setEqpTitle] = useState(equipment.eqpTitle);
    const [eqpInspector, setEqpInspector] = useState(equipment.eqpInspector);
    const [eqpDate, setEqpDate] = useState(currentDate);
    const [eqpStatus, setEqpStatus] = useState(equipment.eqpStatus);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            'eqpTitle': eqpTitle,
            'eqpInspector': eqpInspector,
            'eqpDate': eqpDate,
            'eqpStatus': eqpStatus,
        };
    
        try {
            const eqpCode = equipment.eqpCode; // or equipment.id or whatever field contains the unique code
            dispatch(callEquipmentUpdateAPI(eqpCode, data));
        } catch (error) {
            console.error("Failed to update the equipment: ", error);
        }
        console.log("data: ", data);
    }

    const handleDateChange = (e) => {
        const value = e.target.value;
        const year = value.split("-")[0];
        if (year.length > 4) {
            
        } else {
            setEqpDate(value);  // otherwise, update the value
        }
    };

    /* 글 등록 후 update 값이 확인 되면 목록으로 이동 */
    useEffect(
        () => {
            if(update?.status === 200) {
                alert('기구 정보 수정이 완료되었습니다.');
                window.location.reload();
            } else if (update?.status) {
                alert('수정에 실패했습니다. 다시 한 번 시도해주세요.');
            }
        },
        [update]
    );

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={ EquipmentModalCSS.modal }
            overlayClassName={ EquipmentModalCSS.overlay }
        >
            <form onSubmit={handleSubmit}>
                <label>
                    기구명:
                    <input type="text" value={eqpTitle} onChange={(e) => setEqpTitle(e.target.value)} />
                </label>
                <label>
                    점검자:
                    <input type="text" value={eqpInspector} onChange={(e) => setEqpInspector(e.target.value)} />
                </label>
                <label>
                    최근점검일자:
                    <input type="date" value={eqpDate} onChange={handleDateChange} />
                </label>
                <label>
                    점검상태:
                    <input type="text" value={eqpStatus} onChange={(e) => setEqpStatus(e.target.value)} />
                </label>
                <button type="submit">수정</button>
            </form>
        </ReactModal>
    );
}

export default EquipmentUpdate;
