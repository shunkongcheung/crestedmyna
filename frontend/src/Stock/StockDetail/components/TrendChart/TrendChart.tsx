import React, { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Spin } from "antd";
import { Chart, ChartDataSets } from "chart.js";
import PropTypes from "prop-types";

import classNames from "./TrendChart.module.scss";

interface ITrendChartProps {
  isLoading: boolean;
  labels: Array<string>;
  datasets: Array<ChartDataSets>;
  yAxesUserCallback?: (item: any) => any;
}

function TrendChart({
  datasets,
  isLoading,
  labels,
  yAxesUserCallback
}: ITrendChartProps) {
  const renderedLoading = useMemo(
    () => (
      <div className={classNames.loadingContainer}>
        <Spin />
      </div>
    ),
    []
  );
  const renderedChart = useMemo(
    () => {
      const options: Chart.ChartOptions = {
        legend: { position: "bottom", display: false }
      };
      if (yAxesUserCallback)
        options.scales = {
          yAxes: [{ ticks: { callback: yAxesUserCallback } }]
        };
      return (
        <Line data={{ labels, datasets }} height={100} options={options} />
      );
    },
    [labels, datasets, yAxesUserCallback]
  );

  const renderedContent = useMemo(
    () => (isLoading ? renderedLoading : renderedChart),
    [isLoading, renderedChart, renderedLoading]
  );
  return <>{renderedContent}</>;
}

TrendChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  datasets: PropTypes.array.isRequired,
  yAxesUserCallback: PropTypes.func
};
export default memo(TrendChart);
