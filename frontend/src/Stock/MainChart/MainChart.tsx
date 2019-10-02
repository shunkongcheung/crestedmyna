import React, { memo, useMemo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Line } from "react-chartjs-2";

import RangeItem from "./RangeItem";
import classNames from "./MainChart.module.scss";

interface IPrice {
  date: Date;
  nominalPrice: number;
}
type TRange = "week" | "month" | "year" | "5years";
interface IMainChartProps {
  handleRangeSelected: (r: TRange) => any;
  isLoading: boolean;
  prices: Array<IPrice>;
  range: TRange;
}

function MainChart({
  handleRangeSelected,
  isLoading,
  prices,
  range
}: IMainChartProps) {
  const renderedLoading = useMemo(
    () => (
      <div className={classNames.loadingContainer}>
        <CircularProgress color="secondary" style={{ margin: "0.5rem" }} />
      </div>
    ),
    []
  );

  const renderedChart = useMemo(
    () => (
      <div className={classNames.chartContainer}>
        <Line
          data={{
            labels: prices.map(itm => moment(itm.date).format("YYYY-MM-DD")),
            datasets: [
              {
                fill: false,
                label: "Nominal price",
                backgroundColor: "rgba(233,78,128,1)",
                borderColor: "rgba(233,78,128,1)",
                pointBorderColor: "rgba(233,78,128,1)",
                data: prices.map(itm => itm.nominalPrice)
              }
            ]
          }}
          height={250}
          options={{ legend: { position: "bottom" } }}
        />
      </div>
    ),
    [prices]
  );

  const renderedContent = useMemo(
    () => (isLoading ? renderedLoading : renderedChart),
    [isLoading, renderedChart, renderedLoading]
  );

  return (
    <>
      {renderedContent}
      <div className={classNames.rangeContainer}>
        <RangeItem
          handleRangeSelected={handleRangeSelected}
          name="week"
          selectedRange={range}
        />
        <RangeItem
          handleRangeSelected={handleRangeSelected}
          name="month"
          selectedRange={range}
        />
        <RangeItem
          handleRangeSelected={handleRangeSelected}
          name="year"
          selectedRange={range}
        />
        <RangeItem
          handleRangeSelected={handleRangeSelected}
          name="5years"
          selectedRange={range}
        />
      </div>
    </>
  );
}

MainChart.propTypes = {
  handleRangeSelected: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      nominalPrice: PropTypes.number.isRequired
    })
  ).isRequired,
  range: PropTypes.oneOf(["week", "month", "year", "5years"]).isRequired
};
export default memo(MainChart);
