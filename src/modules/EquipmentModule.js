import { handleActions } from "redux-actions";
import { callEquipmentListAPI } from "../api/EquipmentAPICalls";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';
const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT';
const POST_EQUIPMENT = 'equipment/POST_EQUIPMENT';
const PUT_EQUIPMENT = 'equipment/PUT_EQUIPMENT';
const DELETE_EQUIPMENT = 'equipment/DELETE_EQUIPMENT';

/* 액션 생성자 */
export const getEquipments = (params) => dispatch => {
    callEquipmentListAPI(params)
    .then(res => {
        if (res.status === 200) {
            dispatch({
                type: GET_EQUIPMENTS,
                payload: res.result,
            });
        } else {
            console.error(`Failed to fetch equipment list: ${res.statusText}`);
        }
    })
    .catch(err => {
        console.error(`Failed to fetch equipment list: ${err.message}`);
    });
};

export const getEquipment = (res) => ({ type: GET_EQUIPMENT, payload: res.data });
export const postEquipment = (res) => ({ type: POST_EQUIPMENT, payload: res });
export const putEquipment = (res) => ({ type: PUT_EQUIPMENT, payload: res });
export const deleteEquipment = (res) => ({ type: DELETE_EQUIPMENT, payload: res });

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
