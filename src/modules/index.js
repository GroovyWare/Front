import { combineReducers } from "redux";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";

const rootReducer = combineReducers({
    approvalReducer,
    playReducer
});

export default rootReducer;