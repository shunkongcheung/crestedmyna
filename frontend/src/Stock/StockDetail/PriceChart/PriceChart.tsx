import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Line } from "react-chartjs-2";

import classNames from "./PriceChart.module.scss";

type TRange = "week" | "month" | "year" | "5years";
interface IPriceChartProps {
  labels: Array<string>;
  isLoading: boolean;
  prices: Array<number>;
}

function PriceChart({ isLoading, labels, prices }: IPriceChartProps) {
  const renderedLoading = useMemo(
    () => (
      <div className={classNames.loadingContainer}>
        <CircularProgress color="secondary" style={{ margin: "0.5rem" }} />
      </div>
    ),
    []
  );

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

  const renderedChart = useMemo(
    () => (
      <div className={classNames.chartContainer}>
        <Line
          data={{ labels, datasets }}
          height={100}
          options={{
            legend: { position: "bottom", display: false },
            scales: {
              yAxes: [
                {
                  display: true,
                  position: "left",
                  id: "y-axis-1"
                }
              ]
            }
          }}
        />
      </div>
    ),
    [datasets, labels]
  );

  const renderedContent = useMemo(
    () => (isLoading ? renderedLoading : renderedChart),
    [isLoading, renderedChart, renderedLoading]
  );

  return <>{renderedContent}</>;
}

PriceChart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default memo(PriceChart);
