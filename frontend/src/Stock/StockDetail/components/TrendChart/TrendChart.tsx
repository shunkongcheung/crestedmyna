import React, { createElement, memo, useMemo } from "react";
import * as Charts from "react-chartjs-2";
import { Spin } from "antd";
import { Chart, ChartDataSets } from "chart.js";
import PropTypes from "prop-types";

import classNames from "./TrendChart.module.scss";

interface ITrendChartProps {
  chartType?: "Bar" | "Line";
  isLoading: boolean;
  labels: Array<string>;
  datasets: Array<ChartDataSets>;
  title: string;
  yAxesUserCallback?: (item: any) => any;
}

function TrendChart({
  chartType = "Line",
  datasets,
  isLoading,
  labels,
	title,
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
        legend: { position: "bottom", display: false },
        title: { position: "left", display: true, text: title }
      };
      if (yAxesUserCallback)
        options.scales = {
          yAxes: [{ ticks: { callback: yAxesUserCallback } }]
        };
      const ChartElement = Charts[chartType];
      const data = { labels, datasets };
      const height = 70;
      return createElement(ChartElement, { data, options, height });
    },
    [chartType, labels, datasets, title, yAxesUserCallback]
  );

  const renderedContent = useMemo(
    () => (isLoading ? renderedLoading : renderedChart),
    [isLoading, renderedChart, renderedLoading]
  );
  return <>{renderedContent}</>;
}

TrendChart.propTypes = {
  chartType: PropTypes.oneOf(["bar", "line"]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  datasets: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  yAxesUserCallback: PropTypes.func
};
export default memo(TrendChart);
