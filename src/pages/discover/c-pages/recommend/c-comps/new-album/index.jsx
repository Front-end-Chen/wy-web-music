import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Carousel } from "antd";
import { getNewAlbumsAction } from "../../store/actionCreators";
import ThemeHeaderRecom from "@/components/theme-header-recom";
import AlbumCover from "@/components/album-cover";
import { AlbumWrapper } from "./style";
import {
  NEW_ALBUM_PAGE_NUM as pages,
  NEW_ALBUM_PER_PAGE as nums,
} from "@/services/config";

export default memo(function WYNewAlbum() {
  const { newAlbums } = useSelector(
    state => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewAlbumsAction(pages * nums));
  }, [dispatch]);

  const pageRef = useRef();

  return (
    <AlbumWrapper>
      <ThemeHeaderRecom title="新碟上架" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={e => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map(item => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map(iten => {
                    return (
                      <AlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp="-570px"
                      />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={e => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  );
});
