import React, { memo } from "react";

import Layout from "../Base/Layout";

import PriceLineChart from "./PriceLineChart";
import StockInfo from "./StockInfo";
import StockName from "./StockName";

import useStockContainer from "./useStockContainer";

import classNames from "./StockContainer.module.scss";

function StockContainer() {
  const {
    stockInfoState,
    stockNameState,
    priceLineChartState
  } = useStockContainer();
  return (
    <Layout>
      <div className={classNames.row}>
        <div className={classNames.lineChartContainer}>
          <PriceLineChart {...priceLineChartState} />
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
    </Layout>
  );
}

export default memo(StockContainer);
