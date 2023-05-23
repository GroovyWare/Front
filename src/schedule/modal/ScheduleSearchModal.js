import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css"
import { AllSchedules, createSchedule } from "../../api/CalendarAPICalls";
import { getSchedule, getSchedules, initSchedule } from "../../modules/CalendarModule";




function ScheduleSearchModal({ searchSchedule, setScheduleSearchModal }) {
    const [schCode, setschCode] = useState(0);
    const { data } = useSelector((state) => state.scheduleReducer);
    const dispatch = useDispatch();




/* 검색 결과창 띄우기 */ {
        const onClickHandler = (schCode) => {
            dispatch(getSchedule({ schCode }));
        }


        useEffect(() => {
            dispatch(AllSchedules());
        },[])

        return (
            <div className={ScheduleInsertModalCSS.modal}>
                <div className={ScheduleInsertModalCSS.modalContainer}>
                    <div className={ScheduleInsertModalCSS.insertingformDiv}>
                        <div
                        // className={searchingCSS.table}
                        >
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
                                    {data && data.length > 0 ? (
                                        data.map((searchSchedule) => (
                                            <tr key={searchSchedule.schCode}>
                                                <td>{searchSchedule.start}</td>
                                                <td>{searchSchedule.end}</td>
                                                <td>{searchSchedule.title}</td>
                                                <td>{searchSchedule.schDiv}</td>
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

                                <button>
                                    닫기
                                </button></div>
                        </div>



                    </div>
                </div>
            </div>


        )

    }







}
export default ScheduleSearchModal;