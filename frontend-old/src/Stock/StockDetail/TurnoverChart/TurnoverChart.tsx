import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { TrendChart } from "../components";
import { useGetPrettyNum } from "../../hooks";

interface ITurnoverChartProps {
  handleChartPointHover: (i: number) => any;
  isLoading: boolean;
  labels: Array<string>;
  turnovers: Array<number>;
}

function TurnoverChart({
  handleChartPointHover,
  isLoading,
  labels,
  turnovers
}: ITurnoverChartProps) {
  const { getPrettyNum } = useGetPrettyNum();
  const yAxesUserCallback = useCallback(
    val => `${getPrettyNum(val / 1000, {toFixedDigit:-1})}M`,
    [getPrettyNum]
  );
  const datasets = useMemo(
    () => {
      /// get datesets ----------------------------------------------
      const datasets = [
        {
          fill: false,
          label: "Turnover",
          pointRadius: 1,
          pointHoverRadius: 1,
          backgroundColor: "rgba(233, 78, 80,1)",
          borderColor: "rgba(233, 78, 80,1)",
          pointBorderColor: "rgba(233, 78, 80,1)",
          data: turnovers
        }
      ];

      return datasets;
    },
    [turnovers]
  );

  return (
    <TrendChart
      chartType="Bar"
      displayLabels={false}
      datasets={datasets}
      handleChartPointHover={handleChartPointHover}
      isLoading={isLoading}
      labels={labels}
      title="Turnover"
      yAxesUserCallback={yAxesUserCallback}
    />
  );
}

TurnoverChart.propTypes = {
  handleChartPointHover: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  turnovers: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default memo(TurnoverChart);
