import React, { memo } from "react";

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

import TopBanners from "./c-comps/top-banners";
import HotRecommend from "./c-comps/hot-recommend";
import NewAlbum from "./c-comps/new-album";
import RecomendRanking from "./c-comps/recommend-ranking";
import UserLogin from "./c-comps/user-login";
import SettleSinger from "./c-comps/settle-singer";
import HotAnchor from "./c-comps/hot-anchor";

export default memo(function WYRecommend() {
  return (
    <RecommendWrapper>
      <TopBanners />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RecomendRanking />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
});

//2.使用redux hook
//   //使用shallowEqual浅比较优化性能
//   //使用useSelector将state映射到组件中
//   const { topBanners } = useSelector(
//     state => ({
//         //简写使用getIn
//         topBanners: state.getIn(["recommend", "topBanners"]),
//         // topBanners: state.get("recommend").get("topBanners"),

//       // topBanners: state.recommend.get("topBanners")
//       // topBanners: state.recommend.topBanners,
//     }),
//     shallowEqual
//   );
//   //使用useDispatch将dispatch映射到组件中
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTopBannerAction());
//   }, [dispatch]);

//1.传统react-redux写法
// function WYRecommend(props) {
//     const {getTopBannerAction, topBanners} = props

//     useEffect(() => {
//         getTopBannerAction()
//     }
//     ,[getTopBannerAction])

//     return (
//         <div>
//             <h2>WYRecommend: {topBanners.length}</h2>
//         </div>
//     )
// }

// export default connect(
//     state => ({topBanners: state.recommend.topBanners}),
//     {getTopBannerAction}
//     // 完整写法
//     // dispatch => ({
//     //   getBanners: () => {
//     //     dispatch(getTopBannerAction())
//     //   }
//     // })
// )(memo(WYRecommend));
