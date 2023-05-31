import React from 'react';
import EquipmentItem from '../items/EquipmentItem';

function EquipmentList({ equipmentList }) {
    return (
      <div>
        {equipmentList.map((equipment) => (
          <EquipmentItem key={equipment.eqpCode} equipment={equipment} />
        ))}
      </div>
    );
  }

export default EquipmentList;
