// import { combineReducers } from "redux";
import { combineReducers } from "redux-immutable";

import recommendReducer from '../pages/discover/c-pages/recommend/store'
import playerReducer from '../pages/player/store'

//合并reducer
//使用redux-immutable中的combineReducers性能优化，保证每次传入的是新对象
export default combineReducers({
    recommend: recommendReducer,
    player: playerReducer
});