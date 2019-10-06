import React, { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Spin } from "antd";
import { ChartDataSets } from "chart.js";
import PropTypes from "prop-types";

import classNames from "./TrendChart.module.scss";

interface ITrendChartProps {
  isLoading: boolean;
  labels: Array<string>;
  datasets: Array<ChartDataSets>;
}

function TrendChart({ isLoading, labels, datasets }: ITrendChartProps) {
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
      return (
        <Line
          data={{ labels, datasets }}
          height={100}
          options={{ legend: { position: "bottom", display: false } }}
        />
      );
    },
    [labels, datasets]
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
  datasets: PropTypes.array.isRequired
};
export default memo(TrendChart);
