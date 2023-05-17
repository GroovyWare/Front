import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callPassListAPI } from "../../api/PassAPICalls";
import PagingBar from "../../components/common/PagingBar";
import PassItem from "../items/PassItem";

function PassMain() {

    const dispatch = useDispatch();
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

    return(
        <>

            
            <div>
                { passLists && <PassItem passLists={passLists}/> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
            </div>

            

            <button>등록</button>
            <button>취소</button>
        </>
    );  
}

export default PassMain;