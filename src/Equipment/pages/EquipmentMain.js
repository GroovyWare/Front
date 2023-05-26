import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEquipments, postEquipment } from "../../modules/EquipmentModule";
import EquipmentList from "./EquipmentList";
import { callEquipmentListAPI } from "../../api/EquipmentAPICalls";
import EquipmentModalRegist from "../Modal/EquipmentModalRegist";
import EquipmentModalUpdate from "../Modal/EquipmentModalUpdate";

const EquipmentMain = () => {
    const dispatch = useDispatch();
    const equipments = useSelector(state => state.equipmentReducer);
    const [showModalRegist, setShowModalRegist] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const openModalRegist = () => {
        setShowModalRegist(true);
    };

    const closeModalRegist = () => {
        setShowModalRegist(false);
    };

    const openModalUpdate = () => {
        setShowModalUpdate(true);
    };

    const closeModalUpdate = () => {
        setShowModalUpdate(false);
    };

    useEffect(() => {
        dispatch(getEquipments({ currentPage: 1 }));
    }, [dispatch]);

    return (
        <>
        <div>
            <h1>기구관리</h1>
            <EquipmentList equipments={equipments} />
            <div>
            <button onClick={openModalRegist}>기구 등록</button>
            <button onClick={openModalUpdate}>기구 정보 수정</button>
            {showModalRegist && <EquipmentModalRegist closeModal={closeModalRegist} />}
            {showModalUpdate && <EquipmentModalUpdate closeModal={closeModalUpdate} />}
            </div>
        </div>
        </>
    )
};

export default EquipmentMain;
