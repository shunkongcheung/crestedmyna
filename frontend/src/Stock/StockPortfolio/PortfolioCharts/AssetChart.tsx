import React, { memo, useCallback, useMemo } from "react";
import { Chart, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";

interface IAssetChartProps {
  marketValue: number;
  unrealizedValue: number;
}

function AssetChart({ marketValue, unrealizedValue }: IAssetChartProps) {
  const { getPrettyNum } = useGetPrettyNum();

  const renderTooltip = useCallback(
    (tooltipItem: any, data: any) => {
      const { index } = tooltipItem;
      const label = data.labels[index];
      const value = data.datasets[0].data[index];
      const prettyValue = getPrettyNum(value);

      const sign = index === 1 && unrealizedValue < 0 ? "-" : "";
      return `${label}: ${sign}$${prettyValue}`;
    },
    [getPrettyNum, unrealizedValue]
  );

  const data = useMemo<ChartData>(
    () => {
      const data = [marketValue, Math.abs(unrealizedValue)];
      const marketValueColor = "rgba(54, 162, 235, 0.2)";
      const negColor = "#DF5C5C";
      const posColor = "#5AEB5D";
      const unrealizedValueColor = unrealizedValue >= 0 ? posColor : negColor;
      const backgroundColor = [marketValueColor, unrealizedValueColor];
      return {
        datasets: [{ data, backgroundColor }],
        labels: ["Market value", "Unrealized value"]
      };
    },
    [marketValue, unrealizedValue]
  );
  const options = useMemo<Chart.ChartOptions>(
    () => {
      return {
        /* legend: { position: "bottom", onClick: e => e.stopPropagation() }, */
        legend: { display: false },
        title: { position: "top", display: true, text: "Asset summary" },
        tooltips: { callbacks: { label: renderTooltip } }
      };
    },
    [renderTooltip]
  );
  const renderedChart = useMemo(
    () => <Doughnut data={data} options={options} />,
    [data, options]
  );
  return <>{renderedChart}</>;
}

AssetChart.propTypes = {
  marketValue: PropTypes.number.isRequired,
  unrealizedValue: PropTypes.number.isRequired
};
export default memo(AssetChart);
