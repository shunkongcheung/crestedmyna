import React, { memo } from "react";

import PortfolioCharts from "./PortfolioCharts";
import PortfolioSummary from "./PortfolioSummary";
import StockMasterTable from "./StockMasterTable";

import classNames from "./StockPortfolio.module.scss";

type TOrderBy =
  | "marketValue"
  | "name"
  | "realizedValue"
  | "stockCode"
  | "shareCount"
  | "unrealizedValue";

interface IDistributionItem {
  id: number;
  sectorName: string;
  value: number;
}

interface IChartsState {
  isLoading: boolean;
  selectedSectors: Array<number>;
  stockCountDistributionItems: Array<IDistributionItem>;
  stockMarketValueDistributionItems: Array<IDistributionItem>;
  stockRealizedValueDistributionItems: Array<IDistributionItem>;
  stockUnrealizedValueDistributionItems: Array<IDistributionItem>;
}
interface IOrderParams {
  ordering: TOrderBy;
  isAscend: boolean;
}
interface IStockMaster {
  id: number;
  name: string;
  sector: number;
  stockCode: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
  turnover: number;
  unrealizedCost: number;
  unrealizedValue: number;
}
interface IStockMasterTableState {
  handleListChange: (p: number, o?: IOrderParams) => any;
  stockMasters: Array<IStockMaster>;
  isLoading: boolean;
  page: number;
  sectors: Array<{ name: string; id: number }>;
  total: number;
}

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IPortfolioSummary {
  isLoading: boolean;
  handleSectorsChange: (s: Array<number>) => any;
  stockProfileState: {
    handleStockProfileChange: (s: IStockProfile, f:any) => any;
    isLoading: boolean;
    stockProfile: IStockProfile;
  };
  sectors: Array<{ name: string; id: number }>;
  marketValue: number;
  realizedValue: number;
  unrealizedValue: number;
}
interface IStockPortfolioProps {
  chartsState: IChartsState;
  portfolioSummaryState: IPortfolioSummary;
  stockMasterTableState: IStockMasterTableState;
}

function StockPortfolio({
  chartsState,
  portfolioSummaryState,
  stockMasterTableState
}: IStockPortfolioProps) {
  return (
    <>
      <div className={classNames.row}>
        <div className={classNames.summaryCol}>
          <PortfolioSummary {...portfolioSummaryState} />
        </div>
        <div className={classNames.chartsCol}>
          <PortfolioCharts {...chartsState} />
        </div>
      </div>
      <StockMasterTable {...stockMasterTableState} />
    </>
  );
}

export default memo(StockPortfolio);
