import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import StockTxHeader from "./StockTxHeader";
import StockTxItem from "./StockTxItem";

import classNames from "./StockTxTable.module.scss";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IStockTx {
  txType: "BUY" | "SELL";
  txAt: Date;
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
}

interface IStockTxTableProps {
  isTxsLoading: boolean;
  stockTxs: Array<IStockTx>;
  page: number;
}

function StockTxTable({ stockTxs, isTxsLoading, page }: IStockTxTableProps) {
  const renderedStockTxItems = useMemo(
    () => {
      if (isTxsLoading)
        return (
          <div className={classNames.centerContainer}>
            <CircularProgress color="primary" />
          </div>
        );

      if (Array.isArray(stockTxs) && !stockTxs.length)
        return (
          <div className={classNames.centerContainer}>
            <div className={classNames.noDataBanner}> NO DATA </div>
          </div>
        );
      return stockTxs.map((itm, idx) => (
        <StockTxItem {...itm} key={`StockTxTable-${idx}`} />
      ));
    },
    [isTxsLoading, stockTxs]
  );
  return (
    <>
      <StockTxHeader />
      {renderedStockTxItems}
    </>
  );
}

StockTxTable.propTypes = {
  stockTxs: PropTypes.array.isRequired,
  isTxsLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired
};
export default memo(StockTxTable);
