import React, { memo, useCallback, useMemo } from "react";
import { Spin } from "antd";
import { Chart, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

import { useGetColors, useGetPrettyNum } from "../../hooks";

interface IDistributionItem {
  sectorName: string;
  value: number;
}
interface IPortfolioChartsProps {
  isLoading: boolean;
}
interface IDistributionChartProps {
  distributionItems: Array<IDistributionItem>;
  isLoading: boolean;
  title: string;
}

function DistributionChart({
  distributionItems,
  isLoading,
  title
}: IDistributionChartProps) {
  const { getColors } = useGetColors();
  const { getPrettyNum } = useGetPrettyNum();

  const renderTooltip = useCallback(
    (tooltipItem: any, data: any) => {
      const { index } = tooltipItem;
      const label = data.labels[index];
      const value = data.datasets[0].data[index];
      const prettyValue = getPrettyNum(value);
      return `${label}: $${prettyValue}`;
    },
    [getPrettyNum]
  );

  const data = useMemo<ChartData>(
    () => {
      const relevantData = distributionItems.filter(itm => itm.value);
      const colors = getColors();
      const backgroundColor = colors.splice(0, relevantData.length);
      const data = relevantData.map(itm => itm.value);
      return {
        datasets: [{ data, backgroundColor }],
        labels: relevantData.map(itm => itm.sectorName)
      };
    },
    [distributionItems, getColors]
  );
  const options = useMemo<Chart.ChartOptions>(
    () => {
      return {
        /* legend: { position: "bottom", onClick: e => e.stopPropagation() }, */
        legend: { display: false },
        title: { position: "top", display: true, text: title },
        tooltips: { callbacks: { label: renderTooltip } }
      };
    },
    [renderTooltip, title]
  );
  const renderedChart = useMemo(
    () => <Doughnut data={data} options={options} />,
    [data, options]
  );
  const renderedLoading = useMemo(
    () => (
      <div
        style={{
          width: "100%",
          height: "15vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Spin />
      </div>
    ),
    []
  );

  return <>{isLoading ? renderedLoading : renderedChart}</>;
}

DistributionChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  distributionItems: PropTypes.arrayOf(
    PropTypes.shape({ sectorName: PropTypes.string, value: PropTypes.number })
  ).isRequired,
  title: PropTypes.string.isRequired
};
export default memo(DistributionChart);
