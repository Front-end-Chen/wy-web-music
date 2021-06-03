import styled from "styled-components";

import download from "@/assets/img/download.png";
import banner_sprite from "@/assets/img/banner_sprite.png";

export const BannerWrapper = styled.div`
  background: url(${props => props.bgImage}) center center/6000px;

  .banner {
    height: 270px;
    display: flex;
    position: relative;
  }
`;

export const BannerLeft = styled.div`
  width: 730px;

  .banner-item {
    overflow: hidden;
    height: 270px;
    .image {
      width: 100%;
    }
  }
`;

export const BannerRight = styled.div`
  width: 254px;
  height: 270px;
  background: url(${download});

  .download-title {
    display: block;
    margin: 5px auto;
    text-align: center;
    color: #8d8d8d;
  }
`;

export const BannerRightDownload = styled.a.attrs({
  href: "https://music.163.com/#/download",
  target: "_blank",
})`
  display: block;
  width: 215px;
  height: 56px;
  margin: 186px 0 0 19px;
  &:hover {
    background-image: url(${download});
    background-position: 0 -290px;
  }
`;

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;

  .btn {
    position: absolute;
    transform: translateY(-50%);
    width: 37px;
    height: 63px;
    background-image: url(${banner_sprite});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`;
