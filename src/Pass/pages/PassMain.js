import { useEffect, useState } from "react";
import { callPassListAPI } from "../../api/PassAPICalls";
import PagingBar from "../../components/common/PagingBar";
import PassList from "./PassList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function PassMain() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pass = useSelector(state => state.passReducer);
    const passLists = pass.data;
    const pageInfo = pass.pageInfo;

    const[currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callPassListAPI({currentPage}));
        },
        [currentPage]
    );

    /* 회원권 등록하기 버튼 */
    const onClickRegistHandler = () => {
        navigate(`regist`)
    }

    return(
        <>
        <div>
            <div>회원권 조회</div>
        </div>
            <div>
                { passLists && <PassList passLists={passLists}/> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
            </div>

            <button onClick={ onClickRegistHandler }>등록</button>
        </>
    );  
}

export default PassMain;