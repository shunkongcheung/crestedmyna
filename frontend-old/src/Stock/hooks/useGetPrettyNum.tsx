import { useCallback } from "react";

interface IParams {
  toFixedDigit?: number;
  withDollarSign?: boolean;
  withPercentSign?: boolean;
}

function useGetPrettyNum() {
  const getPrettyNum = useCallback((value: number, params: IParams = {}) => {
    const {
      toFixedDigit = 2,
      withDollarSign = false,
      withPercentSign = false
    } = params;

    const isToFixed = toFixedDigit >= 0;
    const absValue = Math.abs(value);
    const isNegative = value < 0;

    const fixed = isToFixed ? absValue.toFixed(toFixedDigit) : absValue;
    const thousandSeparated = fixed
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const sign = isNegative ? "-" : "";
    const dollar = withDollarSign ? "$" : "";
    const percent = withPercentSign ? "%" : "";

    const prettyNum = `${sign}${dollar}${thousandSeparated}${percent}`;
    return prettyNum;
  }, []);
  return { getPrettyNum };
}

export default useGetPrettyNum;
