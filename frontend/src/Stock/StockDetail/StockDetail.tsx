import React, { memo } from "react";

import ChartSummary from "./ChartSummary";
import CCASSChart from "./CCASSChart";
import PriceChart from "./PriceChart";
import RangeSelector from "./RangeSelector";
import StockInfo from "./StockInfo";
import StockName from "./StockName";
import StockTxAdd from "./StockTxAdd";
import StockTxTable from "./StockTxTable";
import TurnoverChart from "./TurnoverChart";

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
  ccassChartState: {
    detailSums: Array<number>;
    handleChartPointHover: (i: number) => any;
    isLoading: boolean;
    labels: Array<string>;
    participantDetailsMap: { [x: string]: Array<number> };
  };
  chartRangeState: {
    handleRangeSelected: (r: TRange) => any;
    range: TRange;
  };
  chartSummaryState: {
    dateLabel: string;
    participantPercentSum: number;
    price: number;
    turnover: number;
  };
  priceChartState: {
    handleChartPointHover: (i: number) => any;
    isLoading: boolean;
    labels: Array<string>;
    prices: Array<number>;
  };
  stockInfoState: {
    handleDelete: () => Promise<boolean>;
    stockCode: string;
    shareCount: number;
    marketPrice: number;
    marketValue: number;
    realizedValue: number;
    turnover: number;
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
    handleListChange: (p: number) => any;
    isLoading: boolean;
    stockTxs: Array<IStockTx>;
    page: number;
    total: number;
  };
  turnoverChartState: {
    handleChartPointHover: (i: number) => any;
    isLoading: boolean;
    labels: Array<string>;
    turnovers: Array<number>;
  };
  txEditState: {
    handleAddTx: (tx: IStockTxSubmit, f: any) => any;
    handleStockProfileChange: (p: IStockProfile, f: any) => any;
    isProfileLoading: boolean;
    stockProfile: IStockProfile;
  };
}

function StockDetail({
  ccassChartState,
  chartRangeState,
  chartSummaryState,
  priceChartState,
  stockInfoState,
  stockNameState,
  stockTxTableState,
  turnoverChartState,
  txEditState
}: IStockDetailProps) {
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.lineChartContainer}>
          <ChartSummary {...chartSummaryState} />
          <PriceChart {...priceChartState} />
          <TurnoverChart {...turnoverChartState} />
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
