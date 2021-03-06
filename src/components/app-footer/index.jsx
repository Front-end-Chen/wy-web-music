import React, { Fragment, memo } from "react";

import { footerLinks, footerImages } from "@/common/local-data.js";
import { FootLeft, FootRight, AppFooterWrapper } from "./style";

export default memo(function WYAppFooter() {
  return (
    <AppFooterWrapper>
      <div className="content wrap-v2">
        <FootLeft className="left">
          <div className="link">
            {
              footerLinks.map((item, index) => {
                return (
                  <Fragment key={item.title}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                    <span className="line">|</span>
                  </Fragment>
                );
              })
            }
          </div>
          <div className="copyright">
            <span>网易公司版权所有©1997-2021</span>
            <span>
              杭州乐读科技有限公司运营：
              <a
                href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png"
                rel="noopener noreferrer"
                target="_blank"
              >
                浙网文[2021] 1186-054号
              </a>
            </span>
          </div>
          <div className="report">
            <span>违法和不良信息举报电话：0571-89853516</span>
            <span>
              举报邮箱：
              <a
                href="mailto:ncm5990@163.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ncm5990@163.com
              </a>
            </span>
          </div>
          <div className="info">
            <span>粤B2-20090191-18</span>
            <a
              href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
              rel="noopener noreferrer"
              target="_blank"
            >
              工业和信息化部备案管理系统网站
            </a>
          </div>
        </FootLeft>
        <FootRight>
          {
            footerImages.map((item, index) => {
              return (
                <li className="item" key={item.link}>
                  <a className="link" href={item.link} target="_blank" rel="noopener noreferrer"> </a>
                  <span className="title"></span>
                </li>
              );
            })
          }
        </FootRight>
      </div>
    </AppFooterWrapper>
  );
});
