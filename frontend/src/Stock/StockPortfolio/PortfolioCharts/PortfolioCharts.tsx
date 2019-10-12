import React, { memo, useCallback, useMemo } from "react";
/* import { Carousel } from "antd"; */

import DistributionChart from "./DistributionChart";

interface IDistributionItem {
  id: number;
  sectorName: string;
  value: number;
}
interface IPortfolioChartsProps {
  isLoading: boolean;
  selectedSectors: Array<number>;
  stockCountDistributionItems: Array<IDistributionItem>;
  stockMarketValueDistributionItems: Array<IDistributionItem>;
  stockRealizedValueDistributionItems: Array<IDistributionItem>;
  stockUnrealizedValueDistributionItems: Array<IDistributionItem>;
}

function PortfolioCharts({
  isLoading,
  selectedSectors,
  stockCountDistributionItems,
  stockMarketValueDistributionItems,
  stockRealizedValueDistributionItems,
  stockUnrealizedValueDistributionItems
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
    <DistributionChart
      distributionItems={marketValueDistributionItems}
      isLoading={isLoading}
      title="Assets allocation"
    />
  );

  /* return ( */
  /*   <Carousel> */
  /*     <div> */
  /*       <DistributionChart */
  /*         distributionItems={marketValueDistributionItems} */
  /*         isLoading={isLoading} */
  /*         title="Assets allocation" */
  /*       /> */
  /*     </div> */
  /*     <div> */
  /*       <DistributionChart */
  /*         distributionItems={stockCountDistributionItems} */
  /*         isLoading={isLoading} */
  /*         title="No. of stock per sector" */
  /*       /> */
  /*     </div> */
  /*     <div> */
  /*       <DistributionChart */
  /*         distributionItems={realizedDistributionItemsFilterSectors} */
  /*         isLoading={isLoading} */
  /*         title="Realized gain/loss per sector" */
  /*       /> */
  /*     </div> */
  /*     <div> */
  /*       <DistributionChart */
  /*         distributionItems={unrealizedDistributionItemsFilterSectors} */
  /*         isLoading={isLoading} */
  /*         title="Unrealized gain/loss per sector" */
  /*       /> */
  /*     </div> */
  /*   </Carousel> */
  /* ); */
}

export default memo(PortfolioCharts);
