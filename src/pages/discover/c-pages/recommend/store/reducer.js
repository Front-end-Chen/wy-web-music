import * as actionsTypes from "./constants";
import { Map } from "immutable";

//使用ImmutableJS的Map方法将JS对象转换为immutable对象
const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  upRanking: {},
  newRanking: {},
  originRanking: {},
});

export default function reducer(preState = defaultState, action) {
  switch (action.type) {
    case actionsTypes.CHANGE_TOP_BANNERS:
      // 使用immutableJS避免每次用扩展运算符拷贝state，生成新的state
      return preState.set("topBanners", action.topBanners);
    // return {...preState, topBanners: action.topBanners}
    case actionsTypes.CHANGE_HOT_RECOMMEND:
      return preState.set("hotRecommends", action.hotRecommends);
    case actionsTypes.CHANGE_NEW_ALBUMS:
      return preState.set("newAlbums", action.newAlbums);
      
    case actionsTypes.CHANGE_UP_RANKING:
      return preState.set("upRanking", action.upRanking);
    case actionsTypes.CHANGE_NEW_RANKING:
      return preState.set("newRanking", action.newRanking);
    case actionsTypes.CHANGE_ORIGIN_RANKING:
      return preState.set("originRanking", action.originRanking);
    default:
      return preState;
  }
}
