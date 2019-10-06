import React, { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Spin } from "antd";
import PropTypes from "prop-types";

import getColors from "./getColors";

import classNames from "../PriceChart/PriceChart.module.scss";

interface ICCASSChartProps {
  detailSums: Array<number>;
  isLoading: boolean;
  labels: Array<string>;
  participantDetailsMap: { [x: string]: Array<number> };
}

const COLORS = getColors();

function CCASSChart({
  detailSums,
  isLoading,
  labels,
  participantDetailsMap
}: ICCASSChartProps) {
  const renderedLoading = useMemo(
    () => (
      <div className={classNames.loadingContainer}>
        <Spin />
      </div>
    ),
    []
  );
  const datasets = useMemo(
    () => {
      const datasets = [
        {
          fill: false,
          label: "Participant total",
          pointRadius: 1,
          pointHoverRadius: 1,
          backgroundColor: "rgba(2,78,128,1)",
          borderColor: "rgba(2,78,128,1)",
          pointBorderColor: "rgba(2,78,128,1)",
          data: detailSums
        }
      ];
      let idx = 0;
      for (let [label, data] of Object.entries(participantDetailsMap)) {
        datasets.push({
          fill: false,
          label,
          pointRadius: 1,
          pointHoverRadius: 1,
          backgroundColor: COLORS[idx % COLORS.length],
          borderColor: COLORS[idx % COLORS.length],
          pointBorderColor: COLORS[idx % COLORS.length],
          data
        });
        idx++;
      }
      return datasets;
    },
    [detailSums, participantDetailsMap]
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

CCASSChart.propTypes = {
  detailSums: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  participantDetailsMap: PropTypes.object.isRequired
};
export default memo(CCASSChart);
