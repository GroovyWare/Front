import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callEquipmentRegistAPI } from "../../api/EquipmentAPICalls";
import ReactModal from 'react-modal';
import EquipmentModalCSS from './EquipmentModal.module.css'

const EquipmentRegist = ({isOpen, onRequestClose}) => {
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.equipmentReducer);

    const today = new Date();
    const currentDate = today.toISOString().substring(0,10);

    const [eqpTitle, setEqpTitle] = useState('');
    const [eqpInspector, setEqpInspector] = useState('');
    const [eqpPurchase, setEqpPurchase] = useState(currentDate); // Set current date as default

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            'eqpTitle': eqpTitle,
            'eqpInspector': eqpInspector,
            'eqpPurchase': eqpPurchase,
        };
    
        dispatch(callEquipmentRegistAPI(data));
        console.log("data: ", data);
    }

    const handleDateChange = (e) => {
        const value = e.target.value;
        const year = value.split("-")[0];
        if (year.length > 4) {
            setEqpPurchase(eqpPurchase);  // if year length exceeds 4, keep the previous value
        } else {
            setEqpPurchase(value);  // otherwise, update the value
        }
    };

    /* 글 등록 후 regist 값이 확인 되면 목록으로 이동 */
    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('기구 등록이 완료되었습니다.');
                window.location.reload();
            } else if (regist?.status) {
                alert('기구 등록에 실패했습니다. 다시 한 번 시도해주세요.');
            }
        },
        [regist]
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
                    구매일자:
                    <input type="date" value={eqpPurchase} onChange={handleDateChange} />
                </label>
                <button type="submit">등록</button>
            </form>
        </ReactModal>
    );
}

export default EquipmentRegist;
