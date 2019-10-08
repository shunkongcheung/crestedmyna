import React, { memo } from "react";
import StockMasterTable from "./StockMasterTable";

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
interface IStockPortfolioProps {
  stockMasterTableState: IStockMasterTableState;
}

function StockPortfolio({ stockMasterTableState }: IStockPortfolioProps) {
  return (
    <>
      <StockMasterTable {...stockMasterTableState} />
    </>
  );
}

export default memo(StockPortfolio);
