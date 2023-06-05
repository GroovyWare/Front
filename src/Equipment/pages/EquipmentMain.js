import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEquipmentListAPI, callEquipmentSearchListAPI } from "../../api/EquipmentAPICalls";
import PagingBar from "../../components/common/PagingBar";
import EquipmentSearchBar from "../../components/common/EquipmentSearchBar";
import { useSearchParams } from "react-router-dom";
import EquipmentMainCSS from './EquipmentMain.module.css';
import axios from "axios";
import EquipmentRegist from "./EquipmentRegist";
import EquipmentUpdate from "./EquipmentUpdate";

function EquipmentMain() {

    // const userRole = useSelector('state => state.authCode'); // 이 부분은 실제 authCode를 가져오는 Redux Selector로 변경해야 합니다.
    const [userRole] = useState('1'); // 임의의 userRole 상태 생성
    const dispatch = useDispatch();
    const equipments = useSelector(state => state.equipmentReducer);
    const equipmentList = equipments?.data || [];
    const pageInfo = equipments?.pageInfo || null;

    const [sortConfig, setSortConfig] = useState(null);
    const [sortedEquipmentList, setSortedEquipmentList] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedEquipments, setCheckedEquipments] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null); // 선택된 기구 상태

    const [searchCondition, setSearchCondition] = useState('eqpTitle');

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [searchTerm, setSearchTerm] = useState(search || '');

    const [isRegistModalOpen, setRegistModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

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
            dispatch(callEquipmentSearchListAPI({ condition: searchCondition, keyword: searchTerm, currentPage }));
          } else {
            dispatch(callEquipmentListAPI({ currentPage }));
          }
        },
        [dispatch, currentPage, searchTerm, searchCondition]
      );

    useEffect(() => {
        let sortableItems = [...equipmentList];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key === 'eqpPurchase' || sortConfig.key === 'eqpDate') {
                    // 날짜에 대한 정렬 처리
                    const dateA = Date.parse(a[sortConfig.key]);
                    const dateB = Date.parse(b[sortConfig.key]);
                    return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
                } else {
                    // 문자열에 대한 정렬 처리
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        setSortedEquipmentList(sortableItems); // 상태 업데이트
    }, [equipmentList, sortConfig]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    const handleCheckChange = (e, eqpCode) => {
        e.stopPropagation();
        const isChecked = e.target.checked;
    
        if (isChecked) {
            setCheckedEquipments(prev => [...prev, eqpCode]);
        } else {
            setCheckedEquipments(prev => prev.filter(code => code !== eqpCode));
        }
    }

    const onSearch = (searchValue, searchCondition) => {
        setSearchTerm(searchValue);
        setSearchCondition(searchCondition);
        // dispatch(callEquipmentSearchListAPI({ condition: searchCondition, keyword: searchValue, currentPage }));
    }    

    const handleDelete = () => {
        if (checkedEquipments.length === 0) {
            alert("삭제할 기구를 선택해주세요.");
            return;
        }
        
        if (window.confirm("선택한 기구를 삭제하시겠습니까?")) {
            // 모든 삭제 요청을 생성하고 실행
            const deleteRequests = checkedEquipments.map(eqpCode => axios.delete(`http://localhost:8059/equipment/${eqpCode}`));
    
            Promise.all(deleteRequests)
                .then(responses => {
                    // 모든 요청이 성공적으로 완료되었는지 확인
                    const allSuccessful = responses.every(res => res.status === 200);
                    
                    if(allSuccessful) {
                        alert("선택한 기구가 삭제되었습니다.");
                        
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

    const openRegistModal = () => {
        setRegistModalOpen(true);
    }

    const closeRegistModal = () => {
        setRegistModalOpen(false);
    }

    const openUpdateModal = (equipment) => {
        setSelectedEquipment(equipment);
        setUpdateModalOpen(true);
    }

    const closeUpdateModal = () => {
        setSelectedEquipment(null);
        setUpdateModalOpen(false);
    }

    const tdStyles = {
        wordBreak: "break-all"
    };

    return (
        <>  
            <div>
                <EquipmentSearchBar onSearch={onSearch} />
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
                        <th onClick={() => handleSort('eqpTitle')}>기구명</th>
                        <th onClick={() => handleSort('eqpPurchase')}>구매일자</th>
                        <th onClick={() => handleSort('eqpInspector')}>점검자</th>
                        <th onClick={() => handleSort('eqpDate')}>최근점검일자</th>
                        <th>점검내용</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEquipmentList.map(p => (
                        <tr key={p.eqpCode} onClick={() => openUpdateModal(p)}>
                            <td style={{textAlign: "center"}}>
                                <input 
                                    type="checkbox" 
                                    checked={checkedEquipments.includes(p.eqpCode)}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleCheckChange(e, p.eqpCode)}
                                />
                            </td>
                            <td>{p.eqpTitle}</td>
                            <td>{new Date(p.eqpPurchase).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                            <td>{p.eqpInspector}</td> {/* 'employee' 대신 'eqpInspector' 필드 사용 */}
                            <td>{new Date(p.eqpDate).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                            <td style={tdStyles}>{p.eqpStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={ EquipmentMainCSS.buttonDiv }>
            {userRole === '1' && <button onClick={openRegistModal}>등록</button>}
            <EquipmentRegist isOpen={isRegistModalOpen} onRequestClose={closeRegistModal}/>
            {selectedEquipment && 
                <EquipmentUpdate 
                    isOpen={isUpdateModalOpen} 
                    onRequestClose={closeUpdateModal} 
                    equipment={selectedEquipment}
                />
            }
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
