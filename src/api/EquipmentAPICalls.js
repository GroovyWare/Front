import { getEquipment, getEquipments, postEquipment, putEquipment, deleteEquipment } from "../modules/EquipmentModule"

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callEquipmentListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/equipment?page=${currentPage}`;

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(requestURL, {
                method: 'GET',
            });
            const result = await response.json();
    
            console.log('API response:', result);
            
            if (response.status === 200) {  
                console.log('[EquipmentAPICalls] : callEquipmentListAPI result : ', result);
                resolve({ status: response.status, result: result });
            } else {
                console.error(`Failed to fetch equipment list: ${response.statusText}`);
                reject({ status: response.status, message: response.statusText });
            }
        } catch (error) {
            console.error(`Failed to fetch equipment list: ${error.message}`);
            reject({ status: 500, message: error.message });
        }
    });    
};
