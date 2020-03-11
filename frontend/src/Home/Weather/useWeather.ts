import { useCallback, useEffect, useMemo } from "react";
import { useFetchDetail } from "react-accessories";

interface Coord {
  longitude: number;
  latitude: number;
}

interface WeatherBase {
  descMain: string;
  descDetail: string;
  humidity: number;
  iconUrl: string;
  location: string;
  temp: number;
  tempMax: number;
  tempMin: number;
}

interface WeatherResponse extends WeatherBase {
  dataTime: string;
}

interface Weather extends WeatherBase {
  dataTime: Date;
}

function useWeather() {
  const { result, fetchDetail } = useFetchDetail<WeatherResponse>({
    dataTime: "",
    descMain: "",
    descDetail: "",
    humidity: 0,
    iconUrl: "",
    location: "",
    temp: 0,
    tempMax: 0,
    tempMin: 0
  });

  const getLocationCoords = useCallback(async () => {
    if (!navigator.geolocation) return;
    return new Promise((resolve: (v: Coord) => any) => {
      navigator.geolocation.getCurrentPosition(
        (position: { coords: Coord }) => {
          const { coords } = position;
          return resolve(coords);
        },
        () =>
          resolve({
            latitude: 22.427175797385132,
            longitude: 114.2111181483327
          })
      );
    });
  }, []);
  const initWeatherState = useCallback(async () => {
    const coords = await getLocationCoords();
    fetchDetail("/weather", { queryParams: coords, isAuthenticated: false });
  }, [fetchDetail, getLocationCoords]);

  useEffect(() => {
    initWeatherState();
  }, [initWeatherState]);

  const weather = useMemo<Weather>(
    () => ({
      ...result,
      dataTime: new Date(result.dataTime)
    }),
    [result]
  );

  return weather;
}

export default useWeather;
