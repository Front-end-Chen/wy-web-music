import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { headerLinks } from "@/common/local-data.js";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style";

export default memo(function WYAppHeader() {
  const showNavItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return <a href={item.link}>{item.title}</a>;
    }
  };

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <h1>
            <a href="#/" className="logo sprite_01">
              网易云音乐
            </a>
          </h1>
          <div className="select-list">
            {
              headerLinks.map((item, index) => {
                return (
                  <div key={item.title} className="select-item">
                    {showNavItem(item, index)}
                  </div>
                );
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            allowClear
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
});