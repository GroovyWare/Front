import { useNavigate } from 'react-router-dom';

function AnnounceItem({ announce : { announceCode, announceImgUrl, announceTitle }}) {

    const navigate = useNavigate();

    const onClickAnnounceHandler = (announceCode) => {
        navigate(`/announce/${announceCode}`);
    }

    return (
        <div
            
            onClick={ () => onClickAnnounceHandler(announceCode) }
        >
            <img src={ announceImgUrl } alt={ announceTitle }/>
            <h5>{ announceTitle }</h5>
        </div>
    )
}

export default AnnounceItem;