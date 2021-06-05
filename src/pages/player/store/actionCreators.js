import * as actionsTypes from "./constants";

import { getSongDetail } from "@/services/player";

//创建歌曲详情action
const changeCurrentSongAction = currentSong => ({
  type: actionsTypes.CHANGE_CURRENT_SONG,
  currentSong
});

//创建异步获取歌曲详情action
export const getSongDetailAction = (ids) => {
  return dispatch => {
    getSongDetail(ids).then(res => {
      dispatch(changeCurrentSongAction(res.songs[0]));
    });
  };
};

//创建播放列表action
const changePlayListAction = playList => ({
  type: actionsTypes.CHANGE_PLAY_LIST,
  playList
});

//创建播放列表中正在播放的歌曲索引action
const changeCurrentSongIndexAction = index => ({
  type: actionsTypes.CHANGE_CURRENT_SONG_INDEX,
  index
});


//创建异步获取歌曲详情action
// export const getSongDetailAction = (ids) => {
//   return dispatch => {
//     getSongDetail(ids).then(res => {
//       dispatch(changeCurrentSongAction(res.songs[0]));
//     });
//   };
// };