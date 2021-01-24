import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import anonReducer from "./anonReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  anon: anonReducer,
});
