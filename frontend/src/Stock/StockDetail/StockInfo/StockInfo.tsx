import React, { useCallback, memo } from "react";
import { Popconfirm, message } from "antd";
import PropTypes from "prop-types";

import classNames from "./StockInfo.module.scss";

interface IStockInfoProps {
  handleDelete: () => Promise<boolean>;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
  unrealizedValue: number;
}

function StockInfo({
  handleDelete,
  stockCode,
  shareCount,
  marketPrice,
  marketValue,
  realizedValue,
  unrealizedValue
}: IStockInfoProps) {
  const handleDeleteI = useCallback(
    async () => {
      const ok = await handleDelete();
      if (ok) message.success("Stock item is deleted");
    },
    [handleDelete]
  );
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
        <div className={classNames.title}>REALIZED GAIN/LOSS</div>
        <div className={classNames.content}>${realizedValue.toFixed(2)}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>UNREALIZED GAIN/LOSS</div>
        <div className={classNames.content}>${unrealizedValue.toFixed(2)}</div>
      </div>
      <div className={classNames.row}>
        <Popconfirm
          title="Are you sure delete this stock?"
          onConfirm={handleDeleteI}
          okText="Delete"
          cancelText="Cancel"
        >
          <div className={classNames.deleteBtn}>DELETE</div>
        </Popconfirm>
      </div>
    </>
  );
}

StockInfo.propTypes = {
  stockCode: PropTypes.string.isRequired,
  shareCount: PropTypes.number.isRequired,
  marketPrice: PropTypes.number.isRequired,
  marketValue: PropTypes.number.isRequired,
  realizedValue: PropTypes.number.isRequired,
  unrealizedValue: PropTypes.number.isRequired
};
export default memo(StockInfo);
