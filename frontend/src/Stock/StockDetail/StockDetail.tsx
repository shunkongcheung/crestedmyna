import React, { memo } from "react";

import MainChart from "./MainChart";
import StockInfo from "./StockInfo";
import StockName from "./StockName";
import StockTxTable from "./StockTxTable";
import TxEdit from "./TxEdit";

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
  chartState: {
    detailSums: Array<number>;
    endDate: Date;
    handleRangeSelected: (r: TRange) => any;
    labels: Array<string>;
    isLoading: boolean;
    prices: Array<number>;
    participantDetailsMap: { [x: string]: Array<number> };
    range: TRange;
    startDate: Date;
  };
  stockInfoState: {
    handleDelete: () => Promise<boolean>;
    stockCode: string;
    shareCount: number;
    marketPrice: number;
    marketValue: number;
    realizedValue: number;
  };
  stockNameState: {
    handleStockSearch: (search: string) => any;
    handleStockMasterChange: (id: number) => any;
    isLoading: boolean;
    stockMasters: Array<{ name: string; id: number }>;
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
  chartState,
  stockInfoState,
  stockNameState,
  stockTxTableState,
  txEditState
}: IStockDetailProps) {
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.lineChartContainer}>
          <MainChart {...chartState} />
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
      <TxEdit {...txEditState} />
      <StockTxTable {...stockTxTableState} />
    </>
  );
}

export default memo(StockDetail);
