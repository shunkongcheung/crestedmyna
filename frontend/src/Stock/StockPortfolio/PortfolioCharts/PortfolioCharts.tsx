import React, { memo } from "react";

import CountDistributionChart from "./CountDistributionChart";

interface IPortfolioChartsProps {
  stockCountDistribution: {
    isLoading: boolean;
    stockCountItems: Array<{ name: string; count: number }>;
  };
}

function PortfolioCharts({ stockCountDistribution }: IPortfolioChartsProps) {
  return <CountDistributionChart {...stockCountDistribution} />;
}

export default memo(PortfolioCharts);
