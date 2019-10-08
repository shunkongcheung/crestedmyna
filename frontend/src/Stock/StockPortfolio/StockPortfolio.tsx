import React, { memo } from "react";
import StockMasterTable from "./StockMasterTable";
import PortfolioSummary from "./PortfolioSummary";

type TOrderBy =
  | "marketValue"
  | "name"
  | "realizedValue"
  | "stockCode"
  | "shareCount"
  | "unrealizedValue";
interface IOrderParams {
  ordering: TOrderBy;
  isAscend: boolean;
}
interface IStockMaster {
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
interface IPortfolioSummary {
  isLoading: boolean;
  handleSectorsChange: (s: Array<number>) => any;
  sectors: Array<{name:string, id:number}>;
  marketValue: number;
  realizedValue: number;
  unrealizedValue: number;
}
interface IStockPortfolioProps {
  portfolioSummaryState: IPortfolioSummary;
  stockMasterTableState: IStockMasterTableState;
}

function StockPortfolio({
  portfolioSummaryState,
  stockMasterTableState
}: IStockPortfolioProps) {
  return (
    <>
      <PortfolioSummary {...portfolioSummaryState} />
      <StockMasterTable {...stockMasterTableState} />
    </>
  );
}

export default memo(StockPortfolio);
