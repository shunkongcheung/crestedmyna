import React, { memo } from "react";

import StockDetail from "./StockDetail";
import useStockContainer from "./useStockContainer";

function StockContainer() {
  const states = useStockContainer();
  return <StockDetail {...states} />;
}

export default memo(StockContainer);
