import { useEffect, useState } from "react";
import { callPassListAPI } from "../../api/PassAPICalls";
import PassList from "./PassList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PassCSS from "./Pass.module.css";
import PagingBar from "../../components/common/PagingBar";

function PassMain() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pass = useSelector(state => state.passReducer);
    const passLists = pass.data;
    const pageInfo = pass.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

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
            <div className={PassCSS.pageTitleRg}>회원권 조회</div>
        </div>
        <div>
            <hr className={PassCSS.titleLine}></hr>
        </div>
            <div className={PassCSS.mainTableWarp}>
                { passLists && <PassList passLists={passLists}/> }
            </div>

            <hr className={PassCSS.bottonLine}></hr>

            <button 
                className={PassCSS.registBtnRg}
                onClick={ onClickRegistHandler }>등록</button>

            <div className={PassCSS.paging}>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
            </div>

        </>
    );  
}

export default PassMain;