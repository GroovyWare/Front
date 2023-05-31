import React from 'react';
import equipmentReducer from '../../modules/EquipmentModule';

const EquipmentList = ({ equipments }) => {

    const eqpPurchaseDate = new Date(equipmentReducer.eqpPurchase);  // Assuming eqpPurchase is in a valid date format
    const formattedDate = eqpPurchaseDate.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' });

    return (
        <table>
            <thead>
                <tr>
                    <th>기구명</th>
                    <th>구매 일자</th>
                    <th>점검자</th>
                    <th>최근 점검 일자</th>
                    <th>점검 내역</th>
                </tr>
            </thead>
            <tbody>
                {equipments && equipments.map(equipment => (
                    <tr key={equipment.eqpCode}>
                        <td>{equipment.eqpTitle}</td>
                        <td>{new Date(equipment.eqpPurchase).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                        <td>{equipment.employee.empName}</td>
                        <td>{new Date(equipment.eqpDate).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                        <td>{equipment.eqpStatus}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EquipmentList;
