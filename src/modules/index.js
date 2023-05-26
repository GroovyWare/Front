import { combineReducers } from "redux";
import announceReducer from "./AnnounceModule";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";
import historyReducer from "./HistoryModule";
import scheduleReducer from "./CalendarModule";
import loginReducer from "./LoginModule";
import employeeReducer from './EmployeeModule';
import documentReducer from './DocumentModule';
import attendanceReducer from "./AttendanceModule";


const rootReducer = combineReducers({
    announceReducer,
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer,
    historyReducer,
    scheduleReducer,
    loginReducer,
    employeeReducer,
    documentReducer,
    attendanceReducer

});

export default rootReducer;