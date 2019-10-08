import React, { memo, useMemo } from "react";
import { Spin } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart, ChartData } from "chart.js";
import PropTypes from "prop-types";

import { useGetColors } from "../../hooks";

interface ICountDistributionChartProps {
  isLoading: boolean;
  stockCountItems: Array<{ name: string; count: number }>;
}

function CountDistributionChart({
  isLoading,
  stockCountItems
}: ICountDistributionChartProps) {
  const { getColors } = useGetColors();
  const data = useMemo<ChartData>(
    () => {
      const relevantData = stockCountItems.filter(itm => itm.count);
      const colors = getColors();
      const backgroundColor = colors.splice(0, relevantData.length);
      const data = relevantData.map(itm => itm.count);
      const label = "Stock count per sector";
      return {
        datasets: [{ data, backgroundColor, label }],
        labels: relevantData.map(itm => itm.name)
      };
    },
    [getColors, stockCountItems]
  );
  const options = useMemo<Chart.ChartOptions>(() => {
    return {
      legend: { position: "top", onClick: e => e.stopPropagation() }
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
  stockCountItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number
    })
  ).isRequired
};
export default memo(CountDistributionChart);
