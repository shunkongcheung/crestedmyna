import { useCallback } from "react";
import moment from "moment";

import useGetNumArray from "./useGetNumArray";

interface IPrice {
  nominalPrice: number;
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

  const getArrayWithIndexRemoved = useCallback((numArray, emptyIdxes) => {
    const newArray = JSON.parse(JSON.stringify(numArray));
    for (let idx = 0; idx < emptyIdxes.length; idx++) {
      const emptyIdx = emptyIdxes[idx];
      newArray.splice(emptyIdx, 1);
    }
    return newArray;
  }, []);

  const getDataWithoutNaN = useCallback(
    ({ detailSums, labels, participantDetailsMap, prices }) => {
      const emptyIdxes = getNaNIndexes(prices);
      const nonEmptyDetailSums = getArrayWithIndexRemoved(
        detailSums,
        emptyIdxes
      );
      const nonEmptyLabels = getArrayWithIndexRemoved(labels, emptyIdxes);
      const nonEmptyPrices = getArrayWithIndexRemoved(prices, emptyIdxes);
      const nonEmptyMap: { [x: string]: Array<number> } = {};

      for (let [name, data] of Object.entries(participantDetailsMap)) {
        nonEmptyMap[name] = getArrayWithIndexRemoved(data, emptyIdxes);
      }

      return {
        detailSums: nonEmptyDetailSums,
        prices: nonEmptyPrices,
        labels: nonEmptyLabels,
        participantDetailsMap: nonEmptyMap
      };
    },
    [getNaNIndexes, getArrayWithIndexRemoved]
  );

  const getChartData = useCallback(
    (
      startDate: Date,
      endDate: Date,
      detailSums: Array<IDetailSum>,
      prices: Array<IPrice>,
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
        prices,
        "nominalPrice",
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
        prices: priceNums
      };

      return getDataWithoutNaN(withNaNData);
    },
    [getDataWithoutNaN, getNumArray, getLabelsByDates]
  );

  return { getChartData };
}

export default useGetChartDate;
