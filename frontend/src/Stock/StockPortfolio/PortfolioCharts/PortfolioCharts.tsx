import React, { memo } from "react";
import { Carousel } from "antd";

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
  return (
    <Carousel>
      <div>
        <CountDistributionChart {...stockCountDistribution} />
      </div>
      <div>
        <CountDistributionChart {...stockCountDistribution} />
      </div>
      <div>
        <CountDistributionChart {...stockCountDistribution} />
      </div>
    </Carousel>
  );
}

export default memo(PortfolioCharts);
