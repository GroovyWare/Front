import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEquipmentListAPI, callEquipmentSearchListAPI } from "../../api/EquipmentAPICalls";
import PagingBar from "../../components/common/PagingBar";
import SearchBar from "../../components/common/SearchBar";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import EquipmentMainCSS from './EquipmentMain.module.css';
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import EquipmentRegist from "./EquipmentRegist";
import EquipmentUpdate from "./EquipmentUpdate";

function EquipmentMain() {

    // const userRole = useSelector('state => state.authCode'); // 이 부분은 실제 authCode를 가져오는 Redux Selector로 변경해야 합니다.
    const [userRole, setUserRole] = useState('1'); // 임의의 userRole 상태 생성
    const dispatch = useDispatch();
    const equipments = useSelector(state => state.equipmentReducer);
    const navigate = useNavigate();
    const params = useParams();
    const equipmentList = equipments?.data || [];
    const pageInfo = equipments?.pageInfo || null;
    const eqpCode = params.eqpCode;

    const [selectAll, setSelectAll] = useState(false);
    const [checkedEquipments, setCheckedEquipments] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [searchTerm, setSearchTerm] = useState(search || '');

    const [isModalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        if (selectAll) {
            const allEqpCodes = equipmentList.map(p => p.eqpCode);
            setCheckedEquipments(allEqpCodes);
        } else {
            setCheckedEquipments([]);
        }
    }, [selectAll]);

    useEffect(
        () => {
            if(searchTerm) {
                dispatch(callEquipmentSearchListAPI({ search: searchTerm, currentPage }));
            } else {
                dispatch(callEquipmentListAPI({ currentPage }));
            }
        },
        [dispatch, currentPage, searchTerm]
    );

    const handleCheckChange = (eqpCode, isChecked) => {
        if (isChecked) {
            setCheckedEquipments(prev => [...prev, eqpCode]);
        } else {
            setCheckedEquipments(prev => prev.filter(code => code !== eqpCode));
        }
    }

    const onSearch = (searchValue) => {
        setSearchTerm(searchValue);
    }

    const handleDelete = () => {
        if (window.confirm("선택한 기구를 삭제하시겠습니까?")) {
            // 모든 삭제 요청을 생성하고 실행
            const deleteRequests = checkedEquipments.map(eqpCode => axios.delete(`http://localhost:8059/equipment/${eqpCode}`));
    
            Promise.all(deleteRequests)
                .then(responses => {
                    // 모든 요청이 성공적으로 완료되었는지 확인
                    const allSuccessful = responses.every(res => res.status === 200);
                    
                    if(allSuccessful) {
                        alert("선택한 기구가 모두 삭제되었습니다.");
                        
                        window.location.href = "http://localhost:3000/equipment";  // 특정 URL로 리디렉션
                    } else {
                        alert("하나 이상의 기구를 삭제할 수 없습니다. 다시 시도해주세요.");
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("하나 이상의 기구를 삭제할 수 없습니다. 다시 시도해주세요.");
                });
        }
    }

    const openModal = () => {
        setModalOpen(true);
      }
    
    const closeModal = () => {
        setModalOpen(false);
      }

    const tdStyles = {
        wordBreak: "break-all"
    };

    return (
        <>  
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px", marginRight: "20px" }}>
                <SearchBar search={searchTerm} onSearch={onSearch} />
            </div>
            <div className={ EquipmentMainCSS.bodyDiv }>
            <table className={ EquipmentMainCSS.productTable }>
                <colgroup>
                    <col width="2%" />
                    <col width="20%" />
                    <col width="8%" />
                    <col width="6%" />
                    <col width="8%" />
                    <col width="56%" />
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)} /></th>
                        <th>기구명</th>
                        <th>구매일자</th>
                        <th>점검자</th>
                        <th>최근점검일자</th>
                        <th>점검내용</th>
                    </tr>
                </thead>
                <tbody>
                    {equipmentList.map((p) => (
                        <tr key={p.eqpCode}>
                            <td style={{textAlign: "center"}}>
                                <input 
                                    type="checkbox" 
                                    checked={checkedEquipments.includes(p.eqpCode)}
                                    onChange={(e) => handleCheckChange(p.eqpCode, e.target.checked)}
                                />
                            </td>
                            <td>{p.eqpTitle}</td>
                            <td>{new Date(p.eqpPurchase).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                            <td>{p.employee.empName}</td>
                            <td>{new Date(p.eqpDate).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                            <td style={tdStyles}>{p.eqpStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={ EquipmentMainCSS.buttonDiv }>
            {userRole === '1' && <button onClick={openModal}>등록</button>}
            <EquipmentRegist isOpen={isModalOpen} onRequestClose={closeModal}/>
            {userRole === '1' && <button onClick={handleDelete}>삭제</button>}
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
        </>
    );
}

export default EquipmentMain;
