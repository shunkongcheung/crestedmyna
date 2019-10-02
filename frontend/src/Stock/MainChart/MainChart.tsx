import React, { memo, useMemo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Line } from "react-chartjs-2";

import RangeItem from "./RangeItem";
import classNames from "./MainChart.module.scss";

type TRange = "week" | "month" | "year" | "5years";
interface IMainChartProps {
  endDate: Date;
  handleRangeSelected: (r: TRange) => any;
  isLoading: boolean;
  detailSums: Array<number>;
  prices: Array<number>;
  participantDetailsMap: { [x: string]: Array<number> };
  range: TRange;
  startDate: Date;
}
let colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
];

function MainChart({
  detailSums,
  handleRangeSelected,
  isLoading,
  participantDetailsMap,
  prices,
  startDate,
  endDate,
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
  const labels = useMemo(
    () => {
      let curDate = moment(startDate);
      const lastDate = moment(endDate);
      const dates: Array<string> = [];
      while (curDate <= lastDate) {
        dates.push(curDate.format("YYYY-MM-DD"));
        curDate.add(1, "days");
      }
      return dates;
    },
    [startDate, endDate]
  );

  const datasets = useMemo(
    () => {
      // filter all the items that are null in norminal price -------
      let emptyIdxes = [];
      for (let idx = 0; idx < prices.length; idx++) {
        if (isNaN(prices[idx])) emptyIdxes.push(idx);
      }
      emptyIdxes = emptyIdxes.reverse();
      for (let idx = 0; idx < emptyIdxes.length; idx++) {
        const emptyIdx = emptyIdxes[idx];
        prices.splice(emptyIdx, 1);
        for (let data of Object.values(participantDetailsMap)) {
          data.splice(emptyIdx, 1);
        }
        labels.splice(emptyIdx, 1);
        detailSums.splice(emptyIdx, 1);
      }

      /// get datesets ----------------------------------------------
      const datasets = [
        {
          fill: false,
          label: "Nominal price",
          backgroundColor: "rgba(233,78,128,1)",
          borderColor: "rgba(233,78,128,1)",
          pointBorderColor: "rgba(233,78,128,1)",
          data: prices,
          yAxisID: "y-axis-1"
        },
        {
          fill: false,
          label: "Participant total",
          backgroundColor: "rgba(2,78,128,1)",
          borderColor: "rgba(2,78,128,1)",
          pointBorderColor: "rgba(2,78,128,1)",
          data: detailSums,
          yAxisID: "y-axis-2"
        }
      ];

      let idx = 0;
      for (let [label, data] of Object.entries(participantDetailsMap)) {
        datasets.push({
          fill: false,
          label,
          backgroundColor: colorArray[idx % colorArray.length],
          borderColor: colorArray[idx % colorArray.length],
          pointBorderColor: colorArray[idx % colorArray.length],
          data,
          yAxisID: "y-axis-2"
        });
        idx++;
      }

      return datasets;
    },
    [labels, participantDetailsMap, prices]
  );

  const renderedChart = useMemo(
    () => (
      <div className={classNames.chartContainer}>
        <Line
          data={{ labels, datasets }}
          height={250}
          options={{
            legend: { position: "bottom", display: false },
            scales: {
              yAxes: [
                {
                  display: true,
                  position: "left",
                  id: "y-axis-1"
                },
                {
                  display: true,
                  position: "right",
                  id: "y-axis-2"
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
