import { useCallback } from "react";

function useGetNumArray() {
  const getDaysBetweenCount = useCallback(
    (earlyDate: Date, laterDate: Date) => {
      const dateBetweenCount =
        (Number(laterDate) - Number(earlyDate)) / (1000 * 60 * 60 * 24);
      if (dateBetweenCount >= 0) return dateBetweenCount;
      return -dateBetweenCount;
    },
    []
  );
  const getNaNFromLength = useCallback(
    (length: number, objectKey?: string) =>
      Array.from({ length }).map(() => NaN),
    []
  );

  const getNumArrayFromDataArr = useCallback(
    function(
      dataArr: Array<{ [x: string]: any }>,
      dataName: string,
      dateName: string
    ) {
      let numArr: Array<number> = [];
      if (!dataArr.length) return [];

      let lastDate = new Date(dataArr[0][dateName]);

      for (let item of dataArr) {
        const dateStr = item[dateName] as string;
        const dataPoint = item[dataName] as number;
        const curDate = new Date(dateStr);
        const daysBetween = getDaysBetweenCount(lastDate, curDate) - 1;
        const nans = getNaNFromLength(daysBetween);
        numArr = numArr.concat(nans);
        numArr.push(dataPoint);
        lastDate = curDate;
      }
      return numArr;
    },
    [getDaysBetweenCount, getNaNFromLength]
  );

  const getNumArray = useCallback(
    (
      dataArr: Array<{ [x: string]: any }>,
      dataName: string,
      dateName: string,
      startDate: Date,
      endDate: Date
    ) => {
      if (!dataArr.length) {
        const dateBetweenCount = getDaysBetweenCount(endDate, startDate) + 1;
        return getNaNFromLength(dateBetweenCount);
      }

      // prepends --------------------------------------------------
      const firstDate = new Date(dataArr[0][dateName]);
      const dateBetweenStartToFirstCount = getDaysBetweenCount(
        startDate,
        firstDate
      );
      const prepends = getNaNFromLength(dateBetweenStartToFirstCount);

      // sharecounts ----------------------------------------------
      const shareCounts = getNumArrayFromDataArr(dataArr, dataName, dateName);

      // postpend -------------------------------------------------
      const lastDate = new Date(dataArr[dataArr.length - 1][dateName]);
      const dateBetweenLastAndEnd = getDaysBetweenCount(lastDate, endDate);
      const postpends = getNaNFromLength(dateBetweenLastAndEnd);

      // finals --------------------------------------------------
      let finals = prepends.concat(shareCounts);
      finals = finals.concat(postpends);

      return finals;
    },
    [getDaysBetweenCount, getNaNFromLength, getNumArrayFromDataArr]
  );

  return { getNumArray };
}

export default useGetNumArray;
