import React, { useState, useEffect } from 'react';
import AnnounceItem from '../../items/AnnounceItem';
import AnnounceListCSS from './AnnounceList.module.css';
import AnnounceRegistration from '../admin/AnnounceRegistration';

function AnnounceList({ announceList }) {

  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // 로그인한 사용자 정보를 불러와 setCurrentUser로 상태를 업데이트해야 합니다.
  }, []);
  
  // function isAdminOrManager(user) {
  //   return user && (user.role === 'admin' || user.role === 'manager');
  // }

  return (
    <div className={ AnnounceListCSS }>
      {announceList.map((announce) => (
        <AnnounceItem key={announce.annCode} announce={announce} />
      ))}
    </div>
  );
}

export default AnnounceList;
