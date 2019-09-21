import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import StockTxAdd from "./StockTxAdd";
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

interface IStockTxSubmit {
  txType: "BUY" | "SELL";
  txAt: Date;
  shareCount: number;
  price: number;
}
interface IStockTxTableProps {
  handleAddTx: (tx: IStockTxSubmit, f: any) => any;
  handleStockProfileChange: (p: IStockProfile, f: any) => any;
  isTxsLoading: boolean;
  isProfileLoading: boolean;
  stockProfile: IStockProfile;
  stockTxs: Array<IStockTx>;
  page: number;
}

function StockTxTable({
  handleAddTx,
  handleStockProfileChange,
  stockProfile,
  stockTxs,
  isTxsLoading,
  isProfileLoading,
  page
}: IStockTxTableProps) {
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
      <StockTxAdd handleAddTx={handleAddTx} />
      <StockTxHeader
        handleStockProfileChange={handleStockProfileChange}
        isProfileLoading={isProfileLoading}
        stockProfile={stockProfile}
      />
      {renderedStockTxItems}
    </>
  );
}

StockTxTable.propTypes = {
  handleAddTx: PropTypes.func.isRequired,
  handleStockProfileChange: PropTypes.func.isRequired,
  stockProfile: PropTypes.object.isRequired,
  stockTxs: PropTypes.array.isRequired,
  isTxsLoading: PropTypes.bool.isRequired,
  isProfileLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired
};
export default memo(StockTxTable);
