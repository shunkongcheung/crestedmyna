import React, { memo } from "react";

import CountDistributionChart from "./CountDistributionChart";

interface IDistributionItem {
  sectorName: string;
  value: number;
}
interface IPortfolioChartsProps {
  isLoading: boolean;
  stockCountDistributionItems: Array<IDistributionItem>;
  stockRealizedValueDistributionItems: Array<IDistributionItem>;
  stockUnrealizedValueDistributionItems: Array<IDistributionItem>;
}

function PortfolioCharts({ ...stockCountDistribution }: IPortfolioChartsProps) {
  return <CountDistributionChart {...stockCountDistribution} />;
}

export default memo(PortfolioCharts);
