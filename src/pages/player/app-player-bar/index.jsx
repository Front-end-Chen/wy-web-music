import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { NavLink } from "react-router-dom";
import { message, Slider } from "antd";
import {
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,
  getCurrentLyricIndexAction,
} from "../store/actionCreators";
import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";

export default memo(function AppPlayerBar() {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  //redux hook
  const {
    currentSong,
    sequence,
    lyricList,
    currentLyricIndex,
    playList,
  } = useSelector(
    state => ({
      currentSong: state.getIn(["player", "currentSong"]),
      sequence: state.getIn(["player", "sequence"]),
      lyricList: state.getIn(["player", "lyricList"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
      playList: state.getIn(["player", "playList"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  //获取默认播放的歌曲详情信息
  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);

  const audioRef = useRef();
  //设置默认播放的歌曲
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    //设置为自动播放
    // audioRef.current
    //   .play()
    //   .then(res => {
    //     setIsPlaying(true);
    //   })
    //   .catch(err => {
    //     setIsPlaying(false);
    //   });
  }, [currentSong]);

  //数据处理
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");

  //播放按钮回调函数
  //使用useCallback解决sliderAfterChange的useCallback依赖此函数导致失效问题
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  //audio播放时间改变函数
  const timeUpdate = e => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(((currentTime * 1000) / duration) * 100);
    }

    // 获取当前的歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime * 1000 < lyricItem.time) {
        break;
      }
    }

    //保存当前歌词索引
    if (currentLyricIndex !== i - 1) {
      dispatch(getCurrentLyricIndexAction(i - 1));
      //考虑一开始是undefined的情况
      const content = lyricList[i - 1] && lyricList[i - 1].content;
      //没有歌词不显示
      if (content && currentTime !== 0) {
        message.open({
          content: content,
          key: "lyric", //上一个弹窗取消
          duration: 5,
          className: "lyric",
        });
      }
    }
  };

  //传入到其他组件的函数建议用useCallback
  //进度条滑动回调函数
  const sliderChange = useCallback(
    value => {
      setIsChanging(true);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      setProgress(value);
    },
    [duration]
  );

  //进度条滑动结束回调函数
  const sliderAfterChange = useCallback(
    value => {
      setIsChanging(false);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      audioRef.current.currentTime = currentTime / 1000;
      setProgress(value);
      if (!isPlaying) {
        playMusic();
      }
    },
    [isPlaying, duration, playMusic]
  );

  //上一曲与下一曲回调函数
  const changeMusic = tag => {
    message.destroy("lyric")
    dispatch(changeCurrentIndexAndSongAction(tag));
    setIsPlaying(false);
  };

  //切换播放次序回调函数
  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  };

  //音乐播放完毕后回调
  const handleMusicEnded = () => {
    if (sequence === 2) {
      // 单曲循环
      //从头播放当前音乐
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changeCurrentIndexAndSongAction(1));
    }
  };

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="prev sprite_player"
            onClick={e => changeMusic(-1)}
          ></button>
          <button
            className="play sprite_player"
            onClick={e => playMusic()}
          ></button>
          <button
            className="next sprite_player"
            onClick={e => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt={currentSong.name} />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <a className="song-name" href="/todo">
                {currentSong.name}
              </a>
              <a className="singer-name" href="/todo">
                {singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span>{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="btn favor sprite_player"></button>
            <button className="btn share sprite_player"></button>
          </div>
          <div className="right">
            <button className="btn volume sprite_player"></button>
            <button
              className="btn loop sprite_player"
              onClick={e => changeSequence()}
            ></button>
            <button className="btn playlist sprite_player">
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={e => timeUpdate(e)}
        onEnded={e => handleMusicEnded()}
      ></audio>
    </PlaybarWrapper>
  );
});
