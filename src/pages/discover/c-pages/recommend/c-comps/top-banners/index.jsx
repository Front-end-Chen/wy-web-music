import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getTopBannerAction } from "../../store/actionCreators";
import { BannerWrapper, BannerLeft, BannerRight, BannerControl, BannerRightDownload } from "./style";
import { Carousel } from "antd";

export default memo(function WYTopBanners() {
  //banner当前索引
  const [curIndex, setCurIndex] = useState(0);

  //redux相关
  //使用shallowEqual浅比较优化性能
  //使用useSelector将state映射到组件中
  const { topBanners } = useSelector(
    state => ({
      //简写使用getIn
      topBanners: state.getIn(["recommend", "topBanners"]),
      // topBanners: state.get("recommend").get("topBanners"),

      // topBanners: state.recommend.get("topBanners")
      // topBanners: state.recommend.topBanners,
    }),
    shallowEqual
  );
  //使用useDispatch将dispatch映射到组件中
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  // 其他hook
  const bannerRef = useRef();

  //banner改变的回调函数, 保存当前图片索引
  //使用useCallback性能优化，返回
  const bannerChange = useCallback((from, to) => {
    //让setCurIndex变为同步
    setTimeout(() => {
      setCurIndex(to);
    }, 0);
  }, []);

  //加上图片模糊的url参数, 用于动态设置banner大的背景图
  const bgImage =
    topBanners[curIndex] &&
    topBanners[curIndex].imageUrl + "?imageView&blur=40x20";

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            ref={bannerRef}
            effect="fade"
            autoplay="true"
            beforeChange={bannerChange}
          >
            {topBanners.map(item => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight>
          <BannerRightDownload></BannerRightDownload>
          <span className="download-title">PC 安卓 iPhone WP iPad Mac 六大客户端</span>
        </BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={e => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={e => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
});
