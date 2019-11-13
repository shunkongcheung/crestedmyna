import React, { memo, useMemo, useState } from "react";
import { Dropdown, Menu, Spin } from "antd";
import { Moment } from "moment";
import PropTypes from "prop-types";

import StockNewsItem from "./StockNewsItem";
import StockNoticeItem from "./StockNoticeItem";
import StockSubstantialShareholderItem from "./StockSubstantialShareholderItem";

import classNames from "./StockNews.module.scss";

const { SubMenu } = Menu;

interface IStockNewsItem {
  documentLink: string;
  headline: string;
  releaseTime: Moment;
}
interface IStockNotice {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  reasonForDisclosure: string;
  shareCount: number;
  averagePrice: number;
  interestedShare: number;
  sharePercent: number;
  noticeDate: Moment;
  isAssociated: boolean;
  isDebentures: boolean;
}
interface ISubstantialStockShareholder {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  shareCount: number;
  sharePercent: number;
  noticeDate: Moment;
}
interface IStockNewsProps {
  isLoading: boolean;
  stockNews: Array<IStockNewsItem>;
  notices: Array<IStockNotice>;
  substantialShareholders: Array<ISubstantialStockShareholder>;
}

type TContentType = "shareHolders" | "notices" | "news";

function StockNews({
  isLoading,
  notices,
  substantialShareholders,
  stockNews
}: IStockNewsProps) {
  const [contentType, setContentType] = useState<TContentType>("shareHolders");
  const renderedSpin = useMemo(
    () => (
      <div className={classNames.spinContainer}>
        <Spin />
      </div>
    ),
    []
  );
  const renderedNewsItems = useMemo(
    () =>
      stockNews.map((itm, idx) => {
        const key = `StockNewsItem-${idx}`;
        return <StockNewsItem {...itm} key={key} />;
      }),
    [stockNews]
  );
  const renderedNoticeItems = useMemo(
    () =>
      notices.map((itm, idx) => {
        const key = `StockNoticeItem-${idx}`;
        return <StockNoticeItem {...itm} key={key} />;
      }),
    [notices]
  );

  const renderedShareholderItems = useMemo(
    () =>
      substantialShareholders.map((itm, idx) => {
        const key = `StockShareholderItems-${idx}`;
        return <StockSubstantialShareholderItem {...itm} key={key} />;
      }),
    [substantialShareholders]
  );

  const renderedMenu = useMemo(
    () => {
      return (
        <Menu
          onClick={({ key }) => setContentType(key as TContentType)}
          selectedKeys={[contentType]}
        >
          <Menu.Item key="shareHolders">
            <div>SUBSTANTIAL SHAREHOLDERS</div>
          </Menu.Item>
          <Menu.Item key="news">
            <div>NEWS</div>
          </Menu.Item>
          <Menu.Item key="notices">
            <div>NOTICES</div>
          </Menu.Item>
        </Menu>
      );
    },
    [contentType]
  );

  const renderedContent = useMemo(
    () => {
      switch (contentType) {
        case "shareHolders":
          return renderedShareholderItems;
        case "news":
          return renderedNewsItems;
        case "notices":
          return renderedNoticeItems;
        default:
          return "UNDEFINED";
      }
    },
    [
      contentType,
      renderedNewsItems,
      renderedNoticeItems,
      renderedShareholderItems
    ]
  );

  const renderedTitle = useMemo(
    () => {
      switch (contentType) {
        case "shareHolders":
          return "SUBSTANTIAL SHAREHOLDERS";
        case "news":
          return "NEWS";
        case "notices":
          return "NOTICES";
        default:
          return "UNDEFINED";
      }
    },
    [contentType]
  );

  return (
    <div>
      <Dropdown overlay={renderedMenu}>
        <h1 className={classNames.title}>{renderedTitle}</h1>
      </Dropdown>
      <div className={classNames.itemsContainer}>
        {isLoading ? renderedSpin : renderedContent}
      </div>
    </div>
  );
}

StockNews.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  stockNews: PropTypes.array.isRequired
};
export default memo(StockNews);
