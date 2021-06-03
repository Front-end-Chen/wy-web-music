import * as actionsTypes from "./constants";

import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList,
} from "@/services/recommend";

//创建轮播图action
const changeTopBannerAction = data => ({
  type: actionsTypes.CHANGE_TOP_BANNERS,
  topBanners: data.banners,
});

//创建异步轮播图action
export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannerAction(res));
    });
  };
};

//创建热门推荐action
const changeHotRecommendsAction = data => ({
  type: actionsTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: data.result,
});

//创建异步热门推荐action
export const getHotRecommendsAction = limit => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch(changeHotRecommendsAction(res));
    });
  };
};

//创建新碟上架action
const changeNewAlbumsAction = data => ({
  type: actionsTypes.CHANGE_NEW_ALBUMS,
  newAlbums: data.albums,
});

//创建异步新碟上架action
export const getNewAlbumsAction = limit => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      dispatch(changeNewAlbumsAction(res));
    });
  };
};

//创建飙升榜action
const changeUpRankingAction = data => ({
  type: actionsTypes.CHANGE_UP_RANKING,
  upRanking: data.playlist,
});

//创建新歌榜action
const changeNewRankingAction = data => ({
  type: actionsTypes.CHANGE_NEW_RANKING,
  newRanking: data.playlist,
});

//创建原创榜action
const changeOriginRankingAction = data => ({
  type: actionsTypes.CHANGE_ORIGIN_RANKING,
  originRanking: data.playlist,
});

//创建异步新碟上架action
export const getTopRankingAction = idx => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 3:
          dispatch(changeUpRankingAction(res));
          break;
        case 0:
          dispatch(changeNewRankingAction(res));
          break;
        case 2:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
          break;
      }
    });
  };
};
