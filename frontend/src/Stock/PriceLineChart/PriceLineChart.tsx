import React, { memo } from "react";
import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";

interface IPrice {
  date: Date;
  nominalPrice: number;
}
interface IPriceLineChartProps {
  prices: Array<IPrice>;
}

function PriceLineChart({ prices }: IPriceLineChartProps) {
  return (
    <div>
      <div />
      <Line
        data={{
          labels: prices.map(itm => itm.date.toLocaleString()),
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
        options={{ legend: { position: "bottom" } }}
      />
    </div>
  );
}

PriceLineChart.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      nominalPrice: PropTypes.number.isRequired
    })
  ).isRequired
};
export default memo(PriceLineChart);
