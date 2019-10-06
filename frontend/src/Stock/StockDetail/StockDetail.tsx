import React, { memo, useMemo } from "react";

import CCASSChart from "./CCASSChart";
import PriceChart from "./PriceChart";
import RangeSelector from "./RangeSelector";
import StockInfo from "./StockInfo";
import StockName from "./StockName";
import StockTxAdd from "./StockTxAdd";
import StockTxTable from "./StockTxTable";

import classNames from "./StockDetail.module.scss";

type TRange = "week" | "month" | "year" | "5years";
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

interface IStockDetailProps {
  chartRangeState: {
    handleRangeSelected: (r: TRange) => any;
    range: TRange;
  };
  priceChartState: {
    detailSums: Array<number>;
    labels: Array<string>;
    isLoading: boolean;
    prices: Array<number>;
    participantDetailsMap: { [x: string]: Array<number> };
  };
  stockInfoState: {
    handleDelete: () => Promise<boolean>;
    stockCode: string;
    shareCount: number;
    marketPrice: number;
    marketValue: number;
    realizedValue: number;
    unrealizedValue: number;
  };
  stockNameState: {
    handleStockSearch: (search: string) => any;
    handleStockMasterChange: (id: number) => any;
    isLoading: boolean;
    stockMasterNames: Array<{ name: string; id: number }>;
    stockName: string;
  };
  stockTxTableState: {
    isTxsLoading: boolean;
    stockTxs: Array<IStockTx>;
    page: number;
  };
  txEditState: {
    handleAddTx: (tx: IStockTxSubmit, f: any) => any;
    handleStockProfileChange: (p: IStockProfile, f: any) => any;
    isProfileLoading: boolean;
    stockProfile: IStockProfile;
  };
}

function StockDetail({
  chartRangeState,
  priceChartState,
  stockInfoState,
  stockNameState,
  stockTxTableState,
  txEditState
}: IStockDetailProps) {
  const ccassChartState = useMemo(
    () => ({
      participantDetailsMap: priceChartState.participantDetailsMap,
      isLoading: priceChartState.isLoading,
      detailSums: priceChartState.detailSums,
      labels: priceChartState.labels
    }),
    [priceChartState]
  );
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.lineChartContainer}>
          <PriceChart {...priceChartState} />
          <CCASSChart {...ccassChartState} />
          <RangeSelector {...chartRangeState} />
        </div>
        <div className={classNames.rightContainer}>
          <div className={classNames.nameContainer}>
            <StockName {...stockNameState} />
          </div>
          <div className={classNames.infoContainer}>
            <StockInfo {...stockInfoState} />
          </div>
        </div>
      </div>
      <StockTxAdd handleAddTx={txEditState.handleAddTx} />
      <StockTxTable {...stockTxTableState} />
    </>
  );
}

export default memo(StockDetail);
