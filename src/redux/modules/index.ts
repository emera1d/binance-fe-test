import { combineReducers } from "redux";
import productList from "./productList";
import webSocket from "./webSocket";

export const rootReducer = combineReducers({
  productList,
  webSocket,
});
