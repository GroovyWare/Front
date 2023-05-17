import { useNavigate } from 'react-router-dom';

function AnnounceItem({ announce }) {

    const navigate = useNavigate();

    const onClickAnnounceHandler = (announceCode) => {
        navigate(`/announce/${announceCode}`);
    }

    return (
        <div onClick={ () => onClickAnnounceHandler(announce.annCode) }>
            <img src={ announce.announceImgUrl } alt={ announce.annTitle }/>
            <h5>{ announce.annTitle }</h5>
            <p>{ announce.employee }</p>
            <p>{ announce.annDate }</p>
        </div>
    )
}

export default AnnounceItem;