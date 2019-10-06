import React, { memo } from "react";
import PropTypes from "prop-types";

import RangeItem from "./RangeItem";

import classNames from "./RangeSelector.module.scss";

type TRange = "week" | "month" | "year" | "5years";
interface IRangeSelectorProps {
  handleRangeSelected: (r: TRange) => any;
  range: TRange;
}

function RangeSelector({ handleRangeSelected, range }: IRangeSelectorProps) {
  return (
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
  );
}

RangeSelector.propTypes = {
  handleRangeSelected: PropTypes.func.isRequired,
  range: PropTypes.oneOf(["week", "month", "year", "5years"]).isRequired
};
export default memo(RangeSelector);
