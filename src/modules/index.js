import { combineReducers } from "redux";
import announceReducer from "./AnnounceModule";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";

const rootReducer = combineReducers({
    announceReducer,
    approvalReducer,
    playReducer
});

export default rootReducer;