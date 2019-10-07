import { useCallback } from "react";
import moment from "moment";

import useGetNumArray from "./useGetNumArray";

interface ITrend {
  nominalPrice: number;
  turnover: number;
  date: Date;
}

interface IDetailSum {
  detailDate: Date;
  totalShareCount: number;
  totalSharePercent: number;
}
interface ICCASSPArticipantDetail {
  detailDate: Date;
  participantName: string;
  participantId: string;
  shareCount: number;
  sharePercent: number;
}

function useGetChartDate() {
  const { getNumArray } = useGetNumArray();

  const getLabelsByDates = useCallback((startDate: Date, endDate: Date) => {
    let curDate = moment(startDate);
    const lastDate = moment(endDate);
    const dates: Array<string> = [];
    while (curDate <= lastDate) {
      dates.push(curDate.format("YYYY-MM-DD"));
      curDate.add(1, "days");
    }
    return dates;
  }, []);

  const getNaNIndexes = useCallback(numArray => {
    let emptyIdxes = [];
    for (let idx = 0; idx < numArray.length; idx++) {
      if (isNaN(numArray[idx])) emptyIdxes.push(idx);
    }
    return emptyIdxes.reverse();
  }, []);

  const getArrayWithIndexRemoved = useCallback(
    (numArray, emptyIdxes, padding = NaN) => {
      const newArray = JSON.parse(JSON.stringify(numArray));
      for (let idx = 0; idx < emptyIdxes.length; idx++) {
        const emptyIdx = emptyIdxes[idx];
        newArray.splice(emptyIdx, 1);
      }
      return [padding].concat(newArray).concat([padding]);
    },
    []
  );

  const getDataWithoutNaN = useCallback(
    ({ detailSums, labels, participantDetailsMap, prices, turnovers }) => {
      const emptyIdxes = getNaNIndexes(prices);

      const nonEmptyDetailSums = getArrayWithIndexRemoved(
        detailSums,
        emptyIdxes
      );
      const nonEmptyLabels = getArrayWithIndexRemoved(labels, emptyIdxes, "");
      const nonEmptyPrices = getArrayWithIndexRemoved(prices, emptyIdxes);
      const nonEmptyTurnovers = getArrayWithIndexRemoved(turnovers, emptyIdxes);

      const nonEmptyMap: { [x: string]: Array<number> } = {};
      for (let [name, data] of Object.entries(participantDetailsMap))
        nonEmptyMap[name] = getArrayWithIndexRemoved(data, emptyIdxes);

      return {
        detailSums: nonEmptyDetailSums,
        labels: nonEmptyLabels,
        prices: nonEmptyPrices,
        participantDetailsMap: nonEmptyMap,
        turnovers: nonEmptyTurnovers
      };
    },
    [getNaNIndexes, getArrayWithIndexRemoved]
  );

  const getChartData = useCallback(
    (
      startDate: Date,
      endDate: Date,
      detailSums: Array<IDetailSum>,
      trends: Array<ITrend>,
      participantDetailsMap: { [x: string]: Array<ICCASSPArticipantDetail> }
    ) => {
      const dateLabels = getLabelsByDates(startDate, endDate);
      const detailSumNums = getNumArray(
        detailSums,
        "totalSharePercent",
        "detailDate",
        startDate,
        endDate
      );
      const priceNums = getNumArray(
        trends,
        "nominalPrice",
        "date",
        startDate,
        endDate
      );
      const turnoverNums = getNumArray(
        trends,
        "turnover",
        "date",
        startDate,
        endDate
      );
      const participantDetailsMapNums: { [x: string]: Array<number> } = {};
      for (let [name, participantDetails] of Object.entries(
        participantDetailsMap
      )) {
        participantDetailsMapNums[name] = getNumArray(
          participantDetails,
          "sharePercent",
          "detailDate",
          startDate,
          endDate
        );
      }
      const withNaNData = {
        detailSums: detailSumNums,
        labels: dateLabels,
        participantDetailsMap: participantDetailsMapNums,
        prices: priceNums,
        turnovers: turnoverNums
      };

      return getDataWithoutNaN(withNaNData);
    },
    [getDataWithoutNaN, getNumArray, getLabelsByDates]
  );

  return { getChartData };
}

export default useGetChartDate;
