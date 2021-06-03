import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import allReducer from "./reducer";

//配置redux-devtools-extension，即可在浏览器中使用redux-devtools调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  allReducer,
  composeEnhancers(applyMiddleware(thunk))
);