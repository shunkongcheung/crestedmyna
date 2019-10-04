import React, { memo } from "react";

import StockDetail from "./StockDetail";
import useStockContainer from "./useStockContainer";

function StockContainer() {
  const { stockDetailState } = useStockContainer();
  return <StockDetail {...stockDetailState} />;
}

export default memo(StockContainer);
