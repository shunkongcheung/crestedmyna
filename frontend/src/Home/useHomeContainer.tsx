import { useCallback, useMemo, useState } from "react";
import useHmeWeather from "./useHmeWeather";

function useHomeContainer() {
  const weatherState = useHmeWeather();
  return { weatherState };
}

export default useHomeContainer;
