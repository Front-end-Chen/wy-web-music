import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Slider } from "antd";
import { getSongDetailAction } from "../store/actionCreators";
import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
import { NavLink } from "react-router-dom";

export default memo(function AppPlayerBar() {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  //redux hook
  const { currentSong } = useSelector(
    state => ({
      currentSong: state.getIn(["player", "currentSong"]),
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
    //设置为默认播放
    // audioRef.current.play().then(res => {
    //   setIsPlaying(true);
    // }).catch(err => {
    //   setIsPlaying(false);
    // });
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

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="prev sprite_player"></button>
          <button
            className="play sprite_player"
            onClick={e => playMusic()}
          ></button>
          <button className="next sprite_player"></button>
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
        <Operator>
          <div>
            <button className="btn favor sprite_player"></button>
            <button className="btn share sprite_player"></button>
          </div>
          <div className="right">
            <button className="btn volume sprite_player"></button>
            <button className="btn loop sprite_player"></button>
            <button className="btn playlist sprite_player"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)}></audio>
    </PlaybarWrapper>
  );
});
