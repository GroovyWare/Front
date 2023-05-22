import { useNavigate } from 'react-router-dom';

function AnnounceItem({ announce }) {
  const navigate = useNavigate();

  const onClickAnnounceHandler = (annCode) => {
    navigate(`/announce/${annCode}`);
  };

  return (
    <div onClick={() => onClickAnnounceHandler(announce.annCode)}/>
  );
}

export default AnnounceItem;
