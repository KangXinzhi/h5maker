import { FC } from "react";

import "./index.less";

export interface IHeaderProps {}

export const PreviewFooter: FC<IHeaderProps> = () => {
  return (
    <div className="preview-footer-container">
      <div className="footer">
        <div className="ft-links">
          <a href="https://github.com/KangXinzh">店铺主页</a>
          <a href="https://github.com/KangXinzh">个人中心</a>
          <a href="https://github.com/KangXinzh">店铺信息</a>
        </div>
      </div>
    </div>
  );
};
