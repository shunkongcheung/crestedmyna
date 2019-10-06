import React, { useCallback, memo } from "react";
import { Popconfirm, message } from "antd";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";

import classNames from "./StockInfo.module.scss";

interface IStockInfoProps {
  handleDelete: () => Promise<boolean>;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  turnover: number;
  realizedValue: number;
  unrealizedValue: number;
}

function StockInfo({
  handleDelete,
  stockCode,
  shareCount,
  marketPrice,
  marketValue,
  turnover,
  realizedValue,
  unrealizedValue
}: IStockInfoProps) {
  const { getPrettyNum } = useGetPrettyNum();
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
        <div className={classNames.title}>SHARE</div>
        <div className={classNames.content}>{shareCount}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>LATEST PRICE</div>
        <div className={classNames.content}>${marketPrice}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>MARKET VALUE</div>
        <div className={classNames.content}>${getPrettyNum(marketValue)}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>TURNOVER</div>
        <div className={classNames.content}>
          {getPrettyNum(turnover, false)}
        </div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>REALIZED GAIN/LOSS</div>
        <div className={classNames.content}>${getPrettyNum(realizedValue)}</div>
      </div>
      <div className={classNames.row}>
        <div className={classNames.title}>UNREALIZED GAIN/LOSS</div>
        <div className={classNames.content}>
          ${getPrettyNum(unrealizedValue)}
        </div>
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
