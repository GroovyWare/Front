import { combineReducers } from "redux";
import announceReducer from "./AnnounceModule";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";
import historyReducer from "./HistoryModule";
import scheduleReducer from "./CalendarModule";
import loginReducer from "./LoginModule";

const rootReducer = combineReducers({
    announceReducer,
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer,
    historyReducer,
    scheduleReducer,
    loginReducer
});

export default rootReducer;