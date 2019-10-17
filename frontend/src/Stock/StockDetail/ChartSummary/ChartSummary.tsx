import React, { CSSProperties, memo, useCallback, useMemo } from "react";
import { animated, useTransition } from "react-spring";
import PropTypes from "prop-types";

import { useGetPrettyNum } from "../../hooks";

import classNames from "./ChartSummary.module.scss";

interface IChartSummaryProps {
  dateLabel: string;
  price: number;
	stockName:string;
  turnover: number;
  participantPercentSum: number;
}

function ChartSummary({
  dateLabel,
  price,
	stockName,
  turnover,
  participantPercentSum
}: IChartSummaryProps) {
  const { getPrettyNum } = useGetPrettyNum();
  const transitions = useTransition(dateLabel, dateLabel, {
    from: { opacity: 0, transform: "scale(1.2)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" }
  });
  const renderRow = useCallback(
    (data: string, style: CSSProperties, title: string) => (
      <div className={classNames.row} style={style}>
        <div className={classNames.titleCol}>{title}</div>
        <div className={classNames.dataCol}>
          {transitions.map(({ props, key }: any) => (
            <animated.div style={{ ...props, position: "absolute" }} key={key}>
              {data}
            </animated.div>
          ))}
        </div>
      </div>
    ),
    [transitions]
  );

  const renderedChildren = useMemo(
    () => {
      return (
        <>
          {renderRow(dateLabel, { marginLeft: 0 }, "DATE")}
          {renderRow(`$${getPrettyNum(price)}`, {}, "PRICE")}
          {renderRow(`$${getPrettyNum(turnover / 1000)}M`, {}, "TURNOVER")}
          {renderRow(
            `${getPrettyNum(participantPercentSum)}%`,
            { marginRight: 0 },
            "CCASS %"
          )}
        </>
      );
    },
    [dateLabel, getPrettyNum, participantPercentSum, price, renderRow, turnover]
  );

  return (
    <div className={classNames.container}>
      <div className={classNames.header}>{stockName}</div>
      <div className={classNames.summaryContainer}>{renderedChildren}</div>
    </div>
  );
}

ChartSummary.propTypes = {
  dateLabel: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stockName: PropTypes.string.isRequired,
  turnover: PropTypes.number.isRequired,
  participantPercentSum: PropTypes.number.isRequired
};
export default memo(ChartSummary);
