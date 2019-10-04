import React, { memo } from "react";
import PropTypes from "prop-types";

import classNames from "./StockInfo.module.scss";

interface IStockInfoProps {
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
}

function StockInfo({
  stockCode,
  shareCount,
  marketPrice,
  marketValue,
  realizedValue
}: IStockInfoProps) {
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.title}>STOCK CODE</div>
        <div className={classNames.content}>{stockCode}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>SHARES</div>
        <div className={classNames.content}>{shareCount}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>LATEST PRICE</div>
        <div className={classNames.content}>${marketPrice}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>MARKET VALUE</div>
        <div className={classNames.content}>${marketValue}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>REALIZED VALUE</div>
        <div className={classNames.content}>${realizedValue}</div>
      </div>
    </>
  );
}

StockInfo.propTypes = {
  stockCode: PropTypes.string.isRequired,
  shareCount: PropTypes.number.isRequired,
  marketPrice: PropTypes.number.isRequired,
  marketValue: PropTypes.number.isRequired,
  realizedValue: PropTypes.number.isRequired
};
export default memo(StockInfo);
