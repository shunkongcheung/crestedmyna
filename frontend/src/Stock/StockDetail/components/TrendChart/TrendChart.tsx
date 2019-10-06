import React, { createElement, memo, useCallback, useMemo } from "react";
import * as Charts from "react-chartjs-2";
import { Spin } from "antd";
import { Chart, ChartDataSets } from "chart.js";
import PropTypes from "prop-types";

import classNames from "./TrendChart.module.scss";

interface ITrendChartProps {
  chartType?: "Bar" | "Line";
  datasets: Array<ChartDataSets>;
  displayLabels?: boolean;
  isLoading: boolean;
  labels: Array<string>;
  title: string;
  yAxesUserCallback?: (item: any) => any;
}

function TrendChart({
  displayLabels = true,
  chartType = "Line",
  datasets,
  isLoading,
  labels,
  title,
  yAxesUserCallback = val => val
}: ITrendChartProps) {
  const renderedLoading = useMemo(
    () => (
      <div className={classNames.loadingContainer}>
        <Spin />
      </div>
    ),
    []
  );
  const handleTooltipFooterCallback = useCallback(([tooltipItem]: any) => {
    const { index } = tooltipItem;
    return "";
  }, []);
  const renderedChart = useMemo(
    () => {
      const options: Chart.ChartOptions = {
        legend: { position: "bottom", display: false },
        title: { position: "left", display: true, text: title },
        tooltips: { callbacks: { footer: handleTooltipFooterCallback } },
        scales: {
          xAxes: [{ ticks: { display: displayLabels } }],
          yAxes: [{ ticks: { callback: yAxesUserCallback } }]
        }
      };
      const ChartElement = Charts[chartType];
      const data = { labels, datasets };
      const height = 70;
      return createElement(ChartElement, { data, options, height });
    },
    [
      chartType,
      datasets,
      displayLabels,
      handleTooltipFooterCallback,
      labels,
      title,
      yAxesUserCallback
    ]
  );

  const renderedContent = useMemo(
    () => (isLoading ? renderedLoading : renderedChart),
    [isLoading, renderedChart, renderedLoading]
  );
  return <>{renderedContent}</>;
}

TrendChart.propTypes = {
  chartType: PropTypes.oneOf(["Bar", "Line"]),
  datasets: PropTypes.array.isRequired,
  displayLabels: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  yAxesUserCallback: PropTypes.func
};
export default memo(TrendChart);
