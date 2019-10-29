import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { useGetColors } from "../../hooks";

import { TrendChart } from "../components";

interface ICCASSChartProps {
  detailSums: Array<number>;
  handleChartPointHover: (i: number) => any;
  isLoading: boolean;
  labels: Array<string>;
  participantDetailsMap: { [x: string]: Array<number> };
}

function CCASSChart({
  detailSums,
  isLoading,
  handleChartPointHover,
  labels,
  participantDetailsMap
}: ICCASSChartProps) {
  const { getColors } = useGetColors();
  const pointRadius = useMemo(
    () => {
      if (Array.isArray(labels) && labels.length < 30) return 3;
      return 1;
    },
    [labels]
  );
  const datasets = useMemo(
    () => {
      const COLORS = getColors();
      const datasets = [
        {
          fill: false,
          label: "Participant total",
          pointRadius,
          pointHoverRadius: pointRadius,
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
    [detailSums, getColors, participantDetailsMap, pointRadius]
  );

  return (
    <TrendChart
      datasets={datasets}
      handleChartPointHover={handleChartPointHover}
      isLoading={isLoading}
      labels={labels}
      title="Participation distribution"
      yAxesIsPercentRange
    />
  );
}

CCASSChart.propTypes = {
  detailSums: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChartPointHover: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  participantDetailsMap: PropTypes.object.isRequired
};
export default memo(CCASSChart);
