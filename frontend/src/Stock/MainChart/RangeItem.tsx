import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import classNames from "./RangeItem.module.scss";

type TRange = "week" | "month" | "year" | "5years";
interface IRangeItemProps {
  handleRangeSelected: (r: TRange) => any;
  name: TRange;
  selectedRange: TRange;
}

function RangeItem({
  name,
  selectedRange,
  handleRangeSelected
}: IRangeItemProps) {
  const displayName = useMemo(
    () => {
      switch (name) {
        case "week":
          return "this week";
        case "month":
          return "this month";
        case "year":
          return "current year";
        case "5years":
          return "last 5 years";
        default:
          return "unknown";
      }
    },
    [name]
  );

  const className = useMemo(
    () => {
      if (selectedRange === name)
        return `${classNames.container} ${classNames.selected}`;
      return classNames.container;
    },
    [selectedRange, name]
  );

  const handleRangeSelectedI = useCallback(() => handleRangeSelected(name), [
    handleRangeSelected,
    name
  ]);

  return (
    <div className={className} onClick={handleRangeSelectedI}>
      {displayName}
    </div>
  );
}

RangeItem.propTypes = {
  handleRangeSelected: PropTypes.func.isRequired,
  name: PropTypes.oneOf(["week", "month", "year", "5years"]).isRequired,
  selectedRange: PropTypes.oneOf(["week", "month", "year", "5years"]).isRequired
};
export default memo(RangeItem);
