import { combineReducers } from "redux";
import announceReducer from "./AnnounceModule";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";
import historyReducer from "./HistoryModule";
import scheduleReducer from "./CalendarModule";
import loginReducer from "./LoginModule";
import documentReducer from './DocumentModule';

const rootReducer = combineReducers({
    announceReducer,
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer,
    historyReducer,
    scheduleReducer,
    loginReducer,
    documentReducer
});

export default rootReducer;