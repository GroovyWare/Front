import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callEquipmentRegistAPI } from "../../api/EquipmentAPICalls";
import ReactModal from 'react-modal';
import EquipmentRegistCSS from './EquipmentRegist.module.css'
import { toast } from 'react-toastify';

const EquipmentRegist = ({isOpen, onRequestClose}) => {
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.equipmentReducer);

    const today = new Date();
    const currentDate = today.toISOString().substring(0,10);

    const [eqpTitle, setEqpTitle] = useState('');
    const [eqpInspector, setEqpInspector] = useState('');
    const [eqpPurchase, setEqpPurchase] = useState(currentDate); // Set current date as default

    const [eqpTitleError, setEqpTitleError] = useState(false);
    const [eqpInspectorError, setEqpInspectorError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eqpTitle) {
            setEqpTitleError(true);
            return;
        } else {
            setEqpTitleError(false);
        }

        if (!eqpInspector) {
            setEqpInspectorError(true);
            return;
        } else {
            setEqpInspectorError(false);
        }

        if (!eqpTitle || !eqpInspector) {
            return;
        }
        
        const data = {
          'eqpTitle': eqpTitle,
          'eqpInspector': eqpInspector,
          'eqpPurchase': eqpPurchase,
        };
        dispatch(callEquipmentRegistAPI(data));
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
    useEffect(() => {
        if (regist?.status === 200) {
            toast.success('기구 등록이 완료되었습니다.');
            window.location.reload();
        } else if (regist?.status >= 400) {
            toast.error('등록에 실패했습니다. 다시 한 번 시도해주세요.');
        }
    }, [regist]);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={ EquipmentRegistCSS.modal }
            overlayClassName={ EquipmentRegistCSS.overlay }
        >
            <div className={ EquipmentRegistCSS.text0 }>기구 등록</div>
            <form onSubmit={handleSubmit}>
                <div className={ EquipmentRegistCSS.eqpTitle }>
                    <label>
                        <td className={ EquipmentRegistCSS.text1 }>기구명 :</td>
                        <td><input type="text" className={ EquipmentRegistCSS.box1 } value={eqpTitle} onChange={(e) => setEqpTitle(e.target.value)} /></td>
                    </label>
                    {eqpTitleError && <div className={ EquipmentRegistCSS.errorMessage }>기구명을 작성해주세요.</div>}
                </div>
                <div className={ EquipmentRegistCSS.eqpInspector }>
                    <label>
                        <td className={ EquipmentRegistCSS.text2 }>점검자 :</td>
                        <td><input type="text" className={ EquipmentRegistCSS.box2 } value={eqpInspector} onChange={(e) => setEqpInspector(e.target.value)} /></td>
                    </label>
                    <label>
                        <td className={ EquipmentRegistCSS.text3 }>구매일자 :</td>
                        <td><input type="date" value={eqpPurchase} onChange={handleDateChange} /></td>
                    </label>
                    {eqpInspectorError && <div className={ EquipmentRegistCSS.errorMessage }>점검자명을 작성해주세요.</div>}
                </div>
                <button type="submit" className={ EquipmentRegistCSS.button }>등록</button>
            </form>
        </ReactModal>
    );
}

export default EquipmentRegist;
