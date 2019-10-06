import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import { TrendChart } from "../components";

interface IPriceChartProps {
  labels: Array<string>;
  isLoading: boolean;
  prices: Array<number>;
}

function PriceChart({ isLoading, labels, prices }: IPriceChartProps) {
  const datasets = useMemo(
    () => {
      /// get datesets ----------------------------------------------
      const datasets = [
        {
          fill: false,
          label: "Nominal price",
          pointRadius: 1,
          pointHoverRadius: 1,
          backgroundColor: "rgba(233,78,128,1)",
          borderColor: "rgba(233,78,128,1)",
          pointBorderColor: "rgba(233,78,128,1)",
          data: prices
        }
      ];

      return datasets;
    },
    [prices]
  );

  return (
    <TrendChart
      datasets={datasets}
      displayLabels={false}
      isLoading={isLoading}
      labels={labels}
      title="Price"
    />
  );
}

PriceChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default memo(PriceChart);
