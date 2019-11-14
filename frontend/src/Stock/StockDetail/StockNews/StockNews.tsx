import React, { memo, useMemo } from "react";
import { Spin } from "antd";
import { Moment } from "moment";
import PropTypes from "prop-types";

import StockNewsItem from "./StockNewsItem";

import classNames from "./StockNews.module.scss";

interface IStockNewsItem {
  documentLink: string;
  headline: string;
  releaseTime: Moment;
}

interface IStockNewsProps {
  isLoading: boolean;
  stockNews: Array<IStockNewsItem>;
}

function StockNews({ isLoading, stockNews }: IStockNewsProps) {
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
  return (
    <div>
      <h1 className={classNames.title}>NEWS</h1>
      <div className={classNames.itemsContainer}>
        {isLoading ? renderedSpin : renderedNewsItems}
      </div>
    </div>
  );
}

StockNews.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  stockNews: PropTypes.array.isRequired
};
export default memo(StockNews);
