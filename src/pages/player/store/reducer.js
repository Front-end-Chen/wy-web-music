import * as actionsTypes from "./constants";
import { Map } from "immutable";

//使用ImmutableJS的Map方法将JS对象转换为immutable对象
const defaultState = Map({
  currentSong: {},
  playList: [],
  currentSongIndex: 0,
  sequence: 0, // 0 顺序循环 1 随机播放 2 单曲循环
  lyricList: [],
  currentLyricIndex: 0
});

export default function reducer(preState = defaultState, action) {
  switch (action.type) {
    case actionsTypes.CHANGE_CURRENT_SONG:
      return preState.set("currentSong", action.currentSong);
    case actionsTypes.CHANGE_PLAY_LIST:
      return preState.set("playList", action.playList);
    case actionsTypes.CHANGE_CURRENT_SONG_INDEX:
      return preState.set("currentSongIndex", action.index);
    case actionsTypes.CHANGE_SEQUENCE:
      return preState.set("sequence", action.sequence);
    case actionsTypes.CHANGE_LYRIC_LIST:
      return preState.set("lyricList", action.lyricList);
      case actionsTypes.CHANGE_CURRENT_LYRIC_INDEX:
      return preState.set("currentLyricIndex", action.currentLyricIndex);
    default:
      return preState;
  }
}
