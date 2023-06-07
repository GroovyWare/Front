import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callEquipmentUpdateAPI } from "../../api/EquipmentAPICalls";
import ReactModal from 'react-modal';
import EquipmentUpdateCSS from './EquipmentUpdate.module.css'
import { toast } from 'react-toastify';

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

    const [eqpTitleError, setEqpTitleError] = useState(false);
    const [eqpInspectorError, setEqpInspectorError] = useState(false);
    const [eqpStatusError, setEqpStatusError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eqpTitle) {
            setEqpTitleError(true);
        } else {
            setEqpTitleError(false);
        }

        if (!eqpInspector) {
            setEqpInspectorError(true);
        } else {
            setEqpInspectorError(false);
        }

        if (!eqpStatus) {
            setEqpStatusError(true);
        } else {
            setEqpStatusError(false);
        }

        if (!eqpTitle || !eqpInspector || !eqpStatus) {
            return;
        }
        
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

        }
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
    useEffect(() => {
        if (update?.status === 200) {
            toast.success('기구 정보 수정이 완료되었습니다.');
            window.location.reload();
        } else if (update?.status >= 400) {
            toast.error('수정에 실패했습니다. 다시 한 번 시도해주세요.');
        }
    }, [update]);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={ EquipmentUpdateCSS.modal }
            overlayClassName={ EquipmentUpdateCSS.overlay }
        >
            <div className={ EquipmentUpdateCSS.text0 }>기구 수정</div>
            <form onSubmit={handleSubmit}>
                <div className={ EquipmentUpdateCSS.eqpTitle }>
                    <label>
                        <td className={ EquipmentUpdateCSS.text1 }>기구명 :</td>
                        <td><input type="text" className={ EquipmentUpdateCSS.box1 } value={eqpTitle} onChange={(e) => setEqpTitle(e.target.value)} /></td>
                    </label>
                    {eqpTitleError && <div className={ EquipmentUpdateCSS.errorMessage }>기구명을 작성해주세요.</div>}
                </div>
                <div className={ EquipmentUpdateCSS.eqpInspector }>
                    <label>
                        <td className={ EquipmentUpdateCSS.text2 }>점검자 :</td>
                        <td><input type="text" className={ EquipmentUpdateCSS.box2 } value={eqpInspector} onChange={(e) => setEqpInspector(e.target.value)} /></td>
                    </label>
                    <label>
                        <td className={ EquipmentUpdateCSS.text3 }>최근점검일자 :</td>
                        <td><input type="date" value={eqpDate} onChange={handleDateChange} /></td>
                    </label>
                    {eqpInspectorError && <div className={ EquipmentUpdateCSS.errorMessage }>점검자명을 작성해주세요.</div>}
                </div>
                <div>
                    <label className={ EquipmentUpdateCSS.eqpPurchase }>
                        <td className={ EquipmentUpdateCSS.text4 }>점검상태 :</td>
                        <td><input type="text" className={ EquipmentUpdateCSS.box3 } value={eqpStatus} onChange={(e) => setEqpStatus(e.target.value)} /></td>
                    </label>
                    {eqpStatusError && <div className={ EquipmentUpdateCSS.errorMessage }>점검상태를 작성해주세요.</div>}
                </div>
                <div><button type="submit" className={ EquipmentUpdateCSS.button }>수정</button></div>
            </form>
        </ReactModal>
    );
}

export default EquipmentUpdate;
