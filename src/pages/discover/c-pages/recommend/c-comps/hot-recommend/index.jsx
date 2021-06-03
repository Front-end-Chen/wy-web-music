import React, { memo, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getHotRecommendsAction } from "../../store/actionCreators";
import ThemeHeaderRecom from "@/components/theme-header-recom";
import SongsCover from "@/components/songs-cover";
import { HotRecommendWrapper } from "./style";
import { HOT_RECOMMEND_LIMIT as limit } from "@/services/config";

export default memo(function WYHotRecommend() {
  const { hotRecommends } = useSelector(
    state => ({
      hotRecommends: state.getIn(["recommend", "hotRecommends"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotRecommendsAction(limit));
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      <ThemeHeaderRecom
        title="热门推荐"
        keywords={["华语", "流行", "民谣", "摇滚", "电子"]}
      />
      <div className="recommend-list">
        {hotRecommends.map(item => {
          return <SongsCover key={item.id} info={item} />;
        })}
      </div>
    </HotRecommendWrapper>
  );
});
