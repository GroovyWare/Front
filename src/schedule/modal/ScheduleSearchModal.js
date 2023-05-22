// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css"
// import { searchingSchedule } from "../../api/CalendarAPICalls";
// import { getSchedule, getSchedules, initSchedule } from "../../modules/CalendarModule";
// import ScheduleList from "../lists/ScheduleList";
// import PagingBar from "../../components/common/PagingBar";




// function ScheduleSearchModal({ searchSchedule, setScheduleSearchModal }) {
//     const [schCode, setschCode] = useState(0);
//     const { searchvalues } = useSelector((state) => state.scheduleReducer);
//     const dispatch = useDispatch();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [scheduleUpdateModal, setScheduleUpdateModal] = useState(false);
//     // const pageInfo = searchvalues.pageInfo;
//     const [form, setForm] = useState({});
    
//     const searchData = searchvalues && searchvalues.data ? searchvalues.data : [];


// /* 클릭으로 모달창 옮김 */ {
//     const onClickHandler = (schCode) => {
//         setschCode(schCode);
//         dispatch(getSchedule(schCode));
//         setScheduleUpdateModal(true);
//         setScheduleSearchModal(false);
//     }
    
//     useEffect(()=> {
//         dispatch(getSchedule());
//     }, [scheduleUpdateModal])



//         useEffect(() => {
//             dispatch(searchingSchedule({ searchSchedule }));
//         }, [searchSchedule])

//         return (
//             <div className={ScheduleInsertModalCSS.modal}>
//                 <div className={ScheduleInsertModalCSS.modalContainer}>
//                     <div className={ScheduleInsertModalCSS.insertingformDiv}>
//                         <div
//                         // className={searchingCSS.table}
//                         >
//                             <h1>검색 결과</h1>
//                             <table>
//                                 <colgroup>
//                                     <col width="20%" />
//                                     <col width="30%" />
//                                     <col width="30%" />
//                                     <col width="20%" />
//                                 </colgroup>
//                                 <thead>
//                                     <tr>
//                                         <th>시작일</th>
//                                         <th>종료일</th>
//                                         <th>제목</th>
//                                         <th>구분</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {searchvalues && searchvalues.data && searchvalues.data.length > 0 ? (
//                                         searchvalues.data.map((searchvalue) => (
//                                             <tr key={searchvalue.schCode} onClick={() => onClickHandler(searchvalue.schCode)}>
//                                                 {/* 한국어 표시 */}
//                                                 <td>{new Date(searchvalue.start).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
//                                                 <td>{new Date(searchvalue.end).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
//                                                 <td>{searchvalue.title}</td>
//                                                 <td>{searchvalue.schDiv}</td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan={4}>검색 결과가 없습니다.</td>
//                                         </tr>
//                                     )}

//                                 </tbody>


//                             </table>
//                             <div className="button">
//                                 <button>
//                                     확인
//                                 </button>
//                                 <button
//                                     style={{
//                                         border: "none",
//                                         margin: 0,
//                                         fontSize: "10px",
//                                         height: "10px",
//                                     }}
//                                     onClick={() => setScheduleSearchModal(false)}
//                                 >
//                                     돌아가기
//                                 </button></div>
//                         </div>



//                     </div>
//                     <div>

//                     </div>
//                     <div>

//                     </div>
//                 </div>
//             </div>


//         )

//     }







// }
// export default ScheduleSearchModal;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css";
import { AllSchedules, createSchedule, searchingSchedule } from "../../api/CalendarAPICalls";
import { getSchedule, getSchedules, initSchedule } from "../../modules/CalendarModule";
import ScheduleList from "../lists/ScheduleList";
import PagingBar from "../../components/common/PagingBar";
import ScheduleUpdateModal from "./ScheduleUpdateModal";

function ScheduleSearchModal({ searchSchedule, setScheduleSearchModal }) {
  const [schCode, setschCode] = useState(0);
  const { searchvalues } = useSelector((state) => state.scheduleReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleUpdateModal, setScheduleUpdateModal] = useState(false);
  const [form, setForm] = useState({});

  const searchData = searchvalues && searchvalues.data ? searchvalues.data : [];

  const onClickHandler = (schCode) => {
    setschCode(schCode);
    dispatch(getSchedule(schCode));
    setScheduleUpdateModal(true);
    setScheduleSearchModal(false);
  };

  useEffect(() => {
    dispatch(getSchedule());
  }, [scheduleUpdateModal]);

  useEffect(() => {
    dispatch(searchingSchedule({ searchSchedule }));
  }, [searchSchedule]);

  return (
    <div className={ScheduleInsertModalCSS.modal}>
      <div className={ScheduleInsertModalCSS.modalContainer}>
        <div className={ScheduleInsertModalCSS.insertingformDiv}>
          <div>
            <h1>검색 결과</h1>
            <table>
              <colgroup>
                <col width="20%" />
                <col width="30%" />
                <col width="30%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th>시작일</th>
                  <th>종료일</th>
                  <th>제목</th>
                  <th>구분</th>
                </tr>
              </thead>
              <tbody>
                {searchvalues && searchvalues.data && searchvalues.data.length > 0 ? (
                  searchvalues.data.map((searchvalue) => (
                    <tr key={searchvalue.schCode} onClick={() => onClickHandler(searchvalue.schCode)}>
                      <td>{new Date(searchvalue.start).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                      <td>{new Date(searchvalue.end).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                      <td>{searchvalue.title}</td>
                      <td>{searchvalue.schDiv}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>검색 결과가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="button">
              <button>
                확인
              </button>
              <button
                style={{
                  border: "none",
                  margin: 0,
                  fontSize: "10px",
                  height: "10px",
                }}
                onClick={() => setScheduleSearchModal(false)}
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
      {scheduleUpdateModal && (
        <ScheduleUpdateModal schCode={schCode} setScheduleUpdateModal={setScheduleUpdateModal} />
      )}
    </div>
  );
}

export default ScheduleSearchModal;
