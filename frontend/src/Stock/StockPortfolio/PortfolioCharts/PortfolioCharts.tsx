import React, { memo, useCallback, useMemo } from "react";
import { Carousel } from "antd";

import AssetChart from "./AssetChart";
import DistributionChart from "./DistributionChart";

interface IDistributionItem {
  id: number;
  sectorName: string;
  value: number;
}
interface IPortfolioChartsProps {
  isLoading: boolean;
	marketValue:number;
  selectedSectors: Array<number>;
  stockCountDistributionItems: Array<IDistributionItem>;
  stockMarketValueDistributionItems: Array<IDistributionItem>;
  stockRealizedValueDistributionItems: Array<IDistributionItem>;
  stockUnrealizedValueDistributionItems: Array<IDistributionItem>;
	unrealizedValue:number;
}

function PortfolioCharts({
  isLoading,
	marketValue,
  selectedSectors,
  stockCountDistributionItems,
  stockMarketValueDistributionItems,
  stockRealizedValueDistributionItems,
	stockUnrealizedValueDistributionItems,
	unrealizedValue
}: IPortfolioChartsProps) {
  const getFilteredItems = useCallback(
    (distributionItems: Array<IDistributionItem>) => {
      const shouldFilter =
        Array.isArray(selectedSectors) && selectedSectors.length;
      return shouldFilter
        ? distributionItems.filter(itm => selectedSectors.includes(itm.id))
        : distributionItems;
    },
    [selectedSectors]
  );
  const marketValueDistributionItems = useMemo(
    () => getFilteredItems(stockMarketValueDistributionItems),
    [getFilteredItems, stockMarketValueDistributionItems]
  );

  /* const realizedDistributionItemsFilterSectors = useMemo( */
  /*   () => getFilteredItems(stockRealizedValueDistributionItems), */
  /*   [getFilteredItems, stockRealizedValueDistributionItems] */
  /* ); */

  /* const unrealizedDistributionItemsFilterSectors = useMemo( */
  /*   () => getFilteredItems(stockUnrealizedValueDistributionItems), */
  /*   [getFilteredItems, stockUnrealizedValueDistributionItems] */
  /* ); */

  return (
    <Carousel>
      <div>
        <DistributionChart
          distributionItems={marketValueDistributionItems}
          isLoading={isLoading}
          title="Assets allocation"
        />
      </div>
      <div>
        <AssetChart marketValue={marketValue} unrealizedValue={unrealizedValue} />
      </div>
    </Carousel>
  );
}

export default memo(PortfolioCharts);
