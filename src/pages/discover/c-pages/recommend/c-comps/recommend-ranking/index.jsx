import React, { memo, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopRankingAction } from "../../store/actionCreators";

import ThemeHeaderRecom from "@/components/theme-header-recom";
import TopRanking from "@/components/top-ranking";
import { RankingWrapper } from "./style";

export default memo(function WYRecomendRanking() {
  const { upRanking, newRanking, originRanking } = useSelector(
    state => ({
      upRanking: state.getIn(["recommend", "upRanking"]),
      newRanking: state.getIn(["recommend", "newRanking"]),
      originRanking: state.getIn(["recommend", "originRanking"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopRankingAction(0));
    dispatch(getTopRankingAction(2));
    dispatch(getTopRankingAction(3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <ThemeHeaderRecom title="榜单" />
      <div className="tops">
        <TopRanking info={upRanking} />
        <TopRanking info={newRanking} />
        <TopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  );
});
