import * as actionsTypes from "./constants";

import { getSongDetail, getLyric } from "@/services/player";
import { getRandomNumber } from "@/utils/math-utils";
import { parseLyric } from "@/utils/parse-lyric"

//创建歌曲详情action
const changeCurrentSongAction = currentSong => ({
  type: actionsTypes.CHANGE_CURRENT_SONG,
  currentSong,
});

//创建播放列表action
const changePlayListAction = playList => ({
  type: actionsTypes.CHANGE_PLAY_LIST,
  playList,
});

//创建播放列表中正在播放的歌曲索引action
const changeCurrentSongIndexAction = index => ({
  type: actionsTypes.CHANGE_CURRENT_SONG_INDEX,
  index,
});

//创建异步获取歌曲详情action
export const getSongDetailAction = ids => {
  return (dispatch, getState) => {
    // 1.根据id查找playList中是否已经有了该歌曲
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(song => song.id === ids);
    let song = null;
    // 2.判断是否找到歌曲
    if (songIndex !== -1) {
      // 查到歌曲
      song = playList[songIndex];
      dispatch(changeCurrentSongIndexAction(songIndex));
      dispatch(changeCurrentSongAction(song));
      // 请求歌词
      dispatch(getLyricAction(song.id));
    } else {
      // 没有找到歌曲
      // 请求歌曲数据
      getSongDetail(ids).then(res => {
        //判断是否获取到歌曲详情，避免无版权的歌曲
        song = res.songs && res.songs[0];
        if (!song) return;
        // 1.将最新请求到的歌曲添加到播放列表中
        let newPlayList = [...playList, song];
        // 2.更新redux中的值
        dispatch(changePlayListAction(newPlayList));
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        dispatch(changeCurrentSongAction(res.songs[0]));
        // 请求歌词
        dispatch(getLyricAction(song.id));
      });
    }
  };
};

//创建播放列表中正在播放的歌曲索引action
export const changeSequenceAction = sequence => ({
  type: actionsTypes.CHANGE_SEQUENCE,
  sequence,
});

//创建异步切换播放歌曲action
export const changeCurrentIndexAndSongAction = tag => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    const sequence = getState().getIn(["player", "sequence"]);

    switch (sequence) {
      case 1: //随机播放
        let randomIndex = getRandomNumber(playList.length);
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length);
        }
        currentSongIndex = randomIndex;
        break;

      default:
        //顺序循环 / 单曲循环
        currentSongIndex += tag;
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
        break;
    }
    const currentSong = playList[currentSongIndex];

    dispatch(changeCurrentSongIndexAction(currentSongIndex));
    dispatch(changeCurrentSongAction(currentSong));
    // 请求歌词
    dispatch(getLyricAction(currentSong.id));
  };
};

//创建歌词列表action
const changLyricListAction = lyricList => ({
  type: actionsTypes.CHANGE_LYRIC_LIST,
  lyricList,
});

//异步获取歌词的action
const getLyricAction = id => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changLyricListAction(lyricList));
    });
  };
};

//获取当前歌词索引的action
export const getCurrentLyricIndexAction = currentLyricIndex => ({
  type: actionsTypes.CHANGE_CURRENT_LYRIC_INDEX,
  currentLyricIndex
});