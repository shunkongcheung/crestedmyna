import { useCallback } from "react";

function useGetPrettyNum() {
  const getPrettyNum = useCallback(
    (value: number, isToFixed: boolean = true) => {
      const fixed = value.toFixed(2);
      const thousandSeparated = (isToFixed ? fixed : value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return thousandSeparated;
    },
    []
  );
  return { getPrettyNum };
}

export default useGetPrettyNum;
