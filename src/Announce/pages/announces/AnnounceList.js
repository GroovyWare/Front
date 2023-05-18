import React from 'react';
import AnnounceItem from '../../items/AnnounceItem';

function AnnounceList({ announceList }) {
    return (
      <div>
        {announceList.map((announce) => (
          <AnnounceItem key={announce.annCode} announce={announce} />
        ))}
      </div>
    );
  }

export default AnnounceList;
