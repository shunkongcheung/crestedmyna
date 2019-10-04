import React, { memo, useMemo } from "react";
import { MdHourglassFull, MdHourglassEmpty } from "react-icons/md";
import moment from "moment";
import PropTypes from "prop-types";

import classNames from "./StockTxItem.module.scss";

interface IStockTxItemProps {
  txType: "BUY" | "SELL";
  txAt: Date;
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
}

function StockTxItem({
  txType,
  txAt,
  shareCount,
  price,
  grossValue,
  tradeCost,
  netValue
}: IStockTxItemProps) {
  const renderedIcon = useMemo(
    () =>
      txType === "BUY" ? (
        <MdHourglassFull className={classNames.iconFull} />
      ) : (
        <MdHourglassEmpty className={classNames.iconEmpty} />
      ),
    [txType]
  );

  return (
    <div className={classNames.container}>
      <div className={classNames.iconContainer}>{renderedIcon} </div>
      <div className={classNames.txType}>{txType}</div>
      <div className={classNames.netValue}>{netValue}</div>
      <div className={classNames.shareCount}>{shareCount}</div>
      <div className={classNames.price}>{price}</div>
      <div className={classNames.grossValue}>{grossValue}</div>
      <div className={classNames.tradeCost}>{tradeCost}</div>
      <div className={classNames.txAt}>
        {moment(txAt).format("YYYY-MM-DD HH:mm")}
      </div>
    </div>
  );
}

StockTxItem.propTypes = {
  txType: PropTypes.oneOf(["BUY", "SELL"]).isRequired,
  txAt: PropTypes.instanceOf(Date).isRequired,
  shareCount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  grossValue: PropTypes.number.isRequired,
  tradeCost: PropTypes.number.isRequired,
  netValue: PropTypes.number.isRequired
};
export default memo(StockTxItem);
