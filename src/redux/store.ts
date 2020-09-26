import { createStore, applyMiddleware, compose } from "redux";
// import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
// import { createBrowserHistory } from 'history'
// import createHistory from 'history/createBrowserHistory'
import { initialState } from "./initialState";
import { rootReducer } from "./modules";
import { webSocket } from "./middleware";

// export const history = createBrowserHistory()
const enhancers = [];
const middleware = [
  thunk,
  webSocket,
  // routerMiddleware(history)
];

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  rootReducer, // connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);

export default store;
