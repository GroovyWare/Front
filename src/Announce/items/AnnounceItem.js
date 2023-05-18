import { useNavigate } from 'react-router-dom';

function AnnounceItem({ announce }) {
  const navigate = useNavigate();

  const onClickAnnounceHandler = (annCode) => {
    navigate(`/announce/${annCode}`);
  };

  return (
    <div onClick={() => onClickAnnounceHandler(announce.annCode)}>
      {/* 공지사항 아이템 내용 */}
    </div>
  );
}

export default AnnounceItem;
