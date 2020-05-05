import { combineReducers } from "redux";
import userReducer from "./user";
import numberOfCart from "./cart";

export default combineReducers({
  user: userReducer,
  cart: numberOfCart,
});
