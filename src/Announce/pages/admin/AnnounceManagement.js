import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAnnounceListForAdminAPI } from "../../api/AnnounceAPICalls";

function AnnounceManagement() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector(state => state.announceReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callAnnounceListForAdminAPI({currentPage}));
        },
        [currentPage]
    );

    const onClickTableTr = (annCode) => {
        navigate(`/announce-update/${annCode}`);
    }

    const onClickAnnounceInsert = () => {
        navigate("/announce-registration");
    }

    const onClickAnnounceDelete = () => {
        navigate("/announce-delete");
    }

    return (
        <div>
            <div>
                <button onClick={ onClickAnnounceInsert }>글쓰기</button>
                <button onClick={ onClickAnnounceDelete }>글삭제</button>
            </div>
            <table>
                
            </table>
        </div>
    )

}


