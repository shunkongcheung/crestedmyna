import React, { memo, useMemo } from "react";
import { Spin } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart, ChartData } from "chart.js";
import PropTypes from "prop-types";

import { useGetColors } from "../../hooks";

interface IDistributionItem {
  sectorName: string;
  value: number;
}
interface IPortfolioChartsProps {
  isLoading: boolean;
}
interface ICountDistributionChartProps {
  isLoading: boolean;
  stockCountDistributionItems: Array<IDistributionItem>;
}

function CountDistributionChart({
  isLoading,
  stockCountDistributionItems
}: ICountDistributionChartProps) {
  const { getColors } = useGetColors();
  const data = useMemo<ChartData>(
    () => {
      const relevantData = stockCountDistributionItems.filter(itm => itm.value);
      const colors = getColors();
      const backgroundColor = colors.splice(0, relevantData.length);
      const data = relevantData.map(itm => itm.value);
      return {
        datasets: [{ data, backgroundColor }],
        labels: relevantData.map(itm => itm.sectorName)
      };
    },
    [getColors, stockCountDistributionItems]
  );
  const options = useMemo<Chart.ChartOptions>(() => {
    const titleText = "Stock count per sector";
    return {
      legend: { position: "bottom", onClick: e => e.stopPropagation() },
      title: { position: "top", display: true, text: titleText }
    };
  }, []);

  const renderedChart = useMemo(
    () => <Doughnut data={data} options={options} />,
    [data, options]
  );

  return <>{isLoading ? <Spin /> : renderedChart}</>;
}

CountDistributionChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  stockCountDistributionItems: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })
  ).isRequired
};
export default memo(CountDistributionChart);
