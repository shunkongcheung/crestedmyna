import React, { memo } from "react";
import { Moment } from "moment";

import ChartSummary from "./ChartSummary";
import CCASSChart from "./CCASSChart";
import NoticeTable from "./NoticeTable";
import PriceChart from "./PriceChart";
import RangeSelector from "./RangeSelector";
import StockCtrl from "./StockCtrl";
import ShareholderTable from "./ShareholderTable";
import StockInfo from "./StockInfo";
import StockNews from "./StockNews";
import StockName from "./StockName";
import StockTxAdd from "./StockTxAdd";
import StockTxTable from "./StockTxTable";
import TurnoverChart from "./TurnoverChart";

import classNames from "./StockDetail.module.scss";

type TRange = "week" | "month" | "year" | "5years";
type TTxType = "BUY" | "SELL" | "DIVIDEND";

interface IStockNewsItem {
  documentLink: string;
  headline: string;
  releaseTime: Moment;
}
interface IStockTx {
  id: number;
  txType: TTxType;
  txAt: Date;
  shareCount: number;
  price: number;
  grossValue: number;
  tradeCost: number;
  netValue: number;
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

interface IStockTxSubmit {
  txType: TTxType;
  txAt: Date;
  shareCount: number;
  price: number;
}

type TCondition = "COND_ABOVE" | "COND_BELOW";
interface IStockAlert {
  marketPriceValue: number;
  marketPriceCondition: TCondition;
  ccassPercentValue: number;
  ccassPercentCondition: TCondition;
  lastTriggerAt?: Date;
}
interface ISubstantialStockShareholder {
  formSerialUrl: string;
  formSerialNumber: string;
  shareholderName: string;
  shareCount: number;
  sharePercent: number;
  noticeDate: Moment;
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
  stockCtrlState: {
    handleDelete: () => Promise<boolean>;
    handleStockAlertSubmit: (s: IStockAlert, f: any) => Promise<any>;
    isLoading: boolean;
    stockAlert: IStockAlert;
  };
  stockInfoState: {
    handleStockSectorChange: (s: number) => any;
    sector: number;
    sectors: Array<{ name: string; id: number }>;
    stockCode: string;
    name: string;
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
  stockNewsState: {
    isLoading: boolean;
    stockNews: Array<IStockNewsItem>;
    notices: Array<IStockNotice>;
    substantialShareholders: Array<ISubstantialStockShareholder>;
  };
  stockTxTableState: {
    handleListChange: (p: number) => any;
    handleDeleteTx: (id: number) => any;
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
  };
}

function StockDetail({
  ccassChartState,
  chartRangeState,
  chartSummaryState,
  priceChartState,
  stockCtrlState,
  stockInfoState,
  stockNameState,
  stockNewsState,
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
          <StockName {...stockNameState} />
          <div className={classNames.infoContainer}>
            <StockInfo {...stockInfoState} />
            <StockCtrl {...stockCtrlState} />
            <hr />
            <StockNews {...stockNewsState} />
          </div>
        </div>
      </div>
      <div>
        <ShareholderTable
          isLoading={stockNewsState.isLoading}
          substantialShareholders={stockNewsState.substantialShareholders}
        />
        <NoticeTable
          isLoading={stockNewsState.isLoading}
          notices={stockNewsState.notices}
        />
      </div>
      <StockTxAdd handleAddTx={txEditState.handleAddTx} />
      <StockTxTable {...stockTxTableState} />
    </>
  );
}

export default memo(StockDetail);
