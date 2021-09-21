import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

const reducer = combineReducers({
  accountReducer: accountReducer,
});

export default reducer;
