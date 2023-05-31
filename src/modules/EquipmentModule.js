import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';
const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT';
const POST_EQUIPMENT = 'equipment/POST_EQUIPMENT';
const PUT_EQUIPMENT = 'equipment/PUT_EQUIPMENT';
const DELETE_EQUIPMENT = 'equipment/DELETE_EQUIPMENT';

export const { equipment : { getEquipments, getEquipment, postEquipment, putEquipment, deleteEquipment } } = createActions({
    [GET_EQUIPMENTS] : res => res.data,
    [GET_EQUIPMENT] : res => res.data,
    [POST_EQUIPMENT] : res => res,
    [PUT_EQUIPMENT] : res => res,
    [DELETE_EQUIPMENT] : res => res
}); 

/* 리듀서 */
const equipmentReducer = handleActions(
    {
        [GET_EQUIPMENTS] : (state, { payload }) => payload,
        [GET_EQUIPMENT] : (state, { payload }) => payload,
        [POST_EQUIPMENT] : (state, { payload }) => ({ regist : payload }),
        [PUT_EQUIPMENT] : (state, { payload }) => ({ regist : payload }),
        [DELETE_EQUIPMENT] : (state, { payload }) => ({ regist : payload })
    }
, initialState);

export default equipmentReducer;
