import { useCallback, useEffect, useState } from "react";
import moment from "moment";

interface IChartSummaryState {
  dateLabel: string;
  participantPercentSum: number;
  price: number;
  turnover: number;
}

function useChartSummary(
  dateLabels: Array<string>,
  participantPercentSums: Array<number>,
  prices: Array<number>,
  turnovers: Array<number>
) {
  const [chartSummary, setChartSummary] = useState<IChartSummaryState>({
    dateLabel: moment(new Date()).format("YYYY-MM-DD"),
    participantPercentSum: 0,
    price: 0,
    turnover: 0
  });

  const handleChartPointHover = useCallback(
    (index: number) => {
      setChartSummary({
        dateLabel: dateLabels[index],
        participantPercentSum: participantPercentSums[index],
        price: prices[index],
        turnover: turnovers[index]
      });
    },
    [dateLabels, participantPercentSums, prices, turnovers]
  );

  useEffect(
    () => {
      const lastUsefulIndex = dateLabels.length - 2;
      if (!Array.isArray(dateLabels) || lastUsefulIndex < 0) return;
      if (!dateLabels[lastUsefulIndex]) return;
      handleChartPointHover(lastUsefulIndex);
    },
    [dateLabels, handleChartPointHover]
  );

  return { ...chartSummary, handleChartPointHover };
}

export default useChartSummary;
