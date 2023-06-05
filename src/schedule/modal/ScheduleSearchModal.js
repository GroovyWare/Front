
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AllSchedules, createSchedule, oneSchedule, searchingSchedule, deleteSchedule } from "../../api/CalendarAPICalls";
import { getSchedule, getSchedules, initSchedule } from "../../modules/CalendarModule";

import PagingBar from "../../components/common/PagingBar";
import ScheduleSearchModalCSS from "./ScheduleSearhModal.module.css"


function ScheduleSearchModal({ searchSchedule, setScheduleSearchModal, setScheduleUpdateModal, setJustSchedule }) {
  // const [schCode, setschCode] = useState(0);
  const { searchvalues } = useSelector((state) => state.scheduleReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageInfo = searchvalues && searchvalues.pageInfo;

 console.log(pageInfo);

  const searchData = searchvalues && searchvalues.data ? searchvalues.data : [];

  const onClickHandler = (searchValue) => {
    // setschCode(schCode);
    // dispatch(oneSchedule(schCode));
    setJustSchedule(searchValue);
    setScheduleUpdateModal(true);
    setScheduleSearchModal(false);
  };


  // useEffect(() => {
  //   dispatch(getSchedule());
  // }, []);

  useEffect(() => {
    dispatch(searchingSchedule({ searchSchedule, currentPage }));
  }, [searchSchedule, currentPage]);

  return (
    <div className={ScheduleSearchModalCSS.modal}>
      <div className={ScheduleSearchModalCSS.modalContainer}>
        <div className={ScheduleSearchModalCSS.insertingformDiv}>
          <div className={ScheduleSearchModalCSS.results}>
            <h1>검색 결과</h1>
            <table className={ScheduleSearchModalCSS.tables}>
              <colgroup>
                <col width="35%" />
                <col width="30%" />
                <col width="30%" />
                <col width="20%" />
              </colgroup>
              <thead className={ScheduleSearchModalCSS.tableHeader}>
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
                    <tr key={searchvalue.id} onClick={() => onClickHandler(searchvalue)}>
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

            <div className={ScheduleSearchModalCSS.pagings}>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage}/> }
            </div>
            <div className="button">
            
              <button
               className={ScheduleSearchModalCSS.buttons}
                
                onClick={() => setScheduleSearchModal(false)}
              >
                돌아가기
              </button>

              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ScheduleSearchModal;