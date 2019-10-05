import React, { memo } from "react";
import StockMasterTable from "./StockMasterTable";

type TOrderBy =
  | "marketValue"
  | "name"
  | "realizedValue"
  | "stockCode"
  | "shareCount";
interface IOrderParams {
  ordering: TOrderBy;
  isAscend: boolean;
}
interface IStockMaster {
  stockCode: string;
  name: string;
  shareCount: number;
  marketPrice: number;
  marketValue: number;
  realizedValue: number;
}
interface IStockMasterTableState {
  handleListChange: (p: number, o?: IOrderParams) => any;
  stockMasters: Array<IStockMaster>;
  isLoading: boolean;
  page: number;
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
