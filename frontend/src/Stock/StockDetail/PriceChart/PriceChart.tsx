import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { TrendChart } from "../components";

interface IPriceChartProps {
  handleChartPointHover: (i: number) => any;
  isLoading: boolean;
  labels: Array<string>;
  prices: Array<number>;
}

function PriceChart({
  handleChartPointHover,
  isLoading,
  labels,
  prices
}: IPriceChartProps) {
  const pointRadius = useMemo(
    () => {
      if (Array.isArray(labels) && labels.length < 30) return 3;
      return 1;
    },
    [labels]
  );
  const datasets = useMemo(
    () => {
      /// get datesets ----------------------------------------------
      const datasets = [
        {
          fill: false,
          label: "Nominal price",
          pointRadius,
          pointHoverRadius: pointRadius,
          backgroundColor: "rgba(233,78,128,1)",
          borderColor: "rgba(233,78,128,1)",
          pointBorderColor: "rgba(233,78,128,1)",
          data: prices
        }
      ];

      return datasets;
    },
    [prices, pointRadius]
  );

  return (
    <TrendChart
      datasets={datasets}
      displayLabels={false}
      handleChartPointHover={handleChartPointHover}
      isLoading={isLoading}
      labels={labels}
      title="Price"
    />
  );
}

PriceChart.propTypes = {
  handleChartPointHover: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default memo(PriceChart);
