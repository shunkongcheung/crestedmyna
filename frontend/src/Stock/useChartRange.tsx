import { useCallback, useState } from "react";
import moment from "moment";

type TRange = "week" | "month" | "year" | "5years";
function useChartRange() {
  const [chartRange, setChartRange] = useState<TRange>("week");

  const getDatesFromRange = useCallback((range: TRange): {
    startDate: string;
    endDate: string;
  } => {
    const today = new Date();

    const lastMonday = new Date();
    lastMonday.setDate(today.getDate() - today.getDay());

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);

    const firstDayYear = new Date();
    firstDayYear.setDate(1);
    firstDayYear.setMonth(0);

    const fiveYears = new Date();
    fiveYears.setDate(1);
    fiveYears.setMonth(0);
    fiveYears.setFullYear(today.getFullYear() - 5);

    const ret = { endDate: moment(today).format("YYYY-MM-DD") };
    switch (range) {
      case "week":
        return { ...ret, startDate: moment(lastMonday).format("YYYY-MM-DD") };
      case "month":
        return {
          ...ret,
          startDate: moment(firstDayOfMonth).format("YYYY-MM-DD")
        };
      case "year":
        return {
          ...ret,
          startDate: moment(firstDayYear).format("YYYY-MM-DD")
        };
      case "5years":
        return { ...ret, startDate: moment(fiveYears).format("YYYY-MM-DD") };
      default:
        return { ...ret, startDate: moment(today).format("YYYY-MM-DD") };
    }
  }, []);

  return {
    chartRange,
    getDatesFromRange,
    setChartRange
  };
}

export default useChartRange;
