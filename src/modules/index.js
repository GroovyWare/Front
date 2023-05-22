import { combineReducers } from "redux";
import announceReducer from "./AnnounceModule";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";
import scheduleReducer from "./CalendarModule";
import loginReducer from "./LoginModule";
import employeeReducer from './EmployeeModule';

const rootReducer = combineReducers({
    announceReducer,
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer,
    scheduleReducer,
    loginReducer,
    employeeReducer
});

export default rootReducer;