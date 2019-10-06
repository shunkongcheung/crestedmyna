import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { TrendChart } from "../components";

interface ITurnoverChartProps {
  labels: Array<string>;
  isLoading: boolean;
  turnovers: Array<number>;
}

function TurnoverChart({ isLoading, labels, turnovers }: ITurnoverChartProps) {
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
      datasets={datasets}
      isLoading={isLoading}
      labels={labels}
      yAxesUserCallback={item => {
        return `${item / 1000}k`;
      }}
    />
  );
}

TurnoverChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  turnovers: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default memo(TurnoverChart);
