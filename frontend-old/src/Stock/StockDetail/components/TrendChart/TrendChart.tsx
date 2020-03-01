import React, { createElement, memo, useCallback, useMemo } from "react";
import * as Charts from "react-chartjs-2";
import { Spin } from "antd";
import { Chart, ChartDataSets } from "chart.js";
import moment from "moment";
import PropTypes from "prop-types";

import classNames from "./TrendChart.module.scss";

interface ITrendChartProps {
  chartType?: "Bar" | "Line";
  datasets: Array<ChartDataSets>;
  displayLabels?: boolean;
  handleChartPointHover: (i: number) => any;
  isLoading: boolean;
  isTall?: boolean;
  labels: Array<string>;
  title: string;
  yAxesIsPercentRange?: boolean;
  yAxesUserCallback?: (item: any) => any;
}

function TrendChart({
  displayLabels = true,
  chartType = "Line",
  datasets,
  handleChartPointHover,
  isLoading,
  isTall = false,
  labels,
  title,
  yAxesIsPercentRange,
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
  const handleTooltipFooterCallback = useCallback(
    ([tooltipItem]: any) => {
      const { index } = tooltipItem;
      return handleChartPointHover(index);
    },
    [handleChartPointHover]
  );
  const tooltipTitleCallback = useCallback(
    ([tooltipItem]: any) => {
      const { index } = tooltipItem;
      return labels[index];
    },
    [labels]
  );

  const xAxesUserCallback = useCallback((value, index, values) => {
    const rangeLength = values.length;
    if (rangeLength <= 20) return value;

    const curDate = moment(value);

    if (!curDate.isValid()) return value;
    return curDate.format("YYYY-MM");
  }, []);

  const renderedChart = useMemo(
    () => {
      const yAxesTicksExtra = {
        beginAtZero: true,
        steps: 10,
        stepValue: 5,
        max: 100
      };
      const options: Chart.ChartOptions = {
        legend: { position: "bottom", display: false },
        title: { position: "left", display: true, text: title },
        tooltips: {
          callbacks: {
            footer: handleTooltipFooterCallback,
            title: tooltipTitleCallback
          },
          intersect: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: displayLabels,
                callback: xAxesUserCallback
              },
              gridLines: { offsetGridLines: true }
            }
          ],
          yAxes: [
            {
              afterFit: scaleInstance => (scaleInstance.width = 50),
              ticks: {
                callback: yAxesUserCallback,
                ...(yAxesIsPercentRange ? yAxesTicksExtra : {})
              }
            }
          ]
        }
      };
      const ChartElement = Charts[chartType];
      const data = { labels, datasets };
      const height = isTall ? 120 : 60;
      return createElement(ChartElement, { data, options, height });
    },
    [
      chartType,
      datasets,
      displayLabels,
      handleTooltipFooterCallback,
      isTall,
      labels,
      title,
      tooltipTitleCallback,
      xAxesUserCallback,
      yAxesIsPercentRange,
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
  handleChartPointHover: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isTall: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  yAxesIsPercentRange: PropTypes.bool,
  yAxesUserCallback: PropTypes.func
};
export default memo(TrendChart);
