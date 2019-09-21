import React, { memo } from "react";

import Layout from "../Base/Layout";

import PriceLineChart from "./PriceLineChart";
import useStockContainer from "./useStockContainer";

import classNames from "./StockContainer.module.scss";

function StockContainer() {
  const { priceLineChartState } = useStockContainer();
  return (
    <Layout>
      <div className={classNames.row}>
        <div className={classNames.lineChartDiv}>
          <PriceLineChart {...priceLineChartState} />
        </div>
        <div className={classNames.infoDiv}>hihi</div>
      </div>
    </Layout>
  );
}

export default memo(StockContainer);
