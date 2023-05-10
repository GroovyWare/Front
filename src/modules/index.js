import { combineReducers } from "redux";
import productReducer from "./ProductModule";
import memberReducer from "./MemberModule";
import purchaseReducer from "./PurchaseModule";

const rootReducer = combineReducers({
    productReducer,
    memberReducer,
    purchaseReducer
});

export default rootReducer;