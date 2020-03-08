import { useCallback, useEffect, useState } from "react";
import { useFetchEdit } from "react-accessories";

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

interface WeatherState extends WeatherBase {
  dataTime: Date;
  loading: boolean;
}

function useWeather() {
  const [weather, setWeather] = useState<WeatherState>({
    dataTime: new Date(),
    descMain: "",
    descDetail: "",
    humidity: 0,
    iconUrl: "",
    location: "",
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    loading: true
  });
  const fetchEdit = useFetchEdit<WeatherResponse>();

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

    if (!coords) return;
    const res = await fetchEdit("/weather", {
      data: coords,
      isAuthenticated: false
    });
    if (!res) return;
    setWeather({ ...res, dataTime: new Date(res.dataTime), loading: false });
  }, [fetchEdit, getLocationCoords]);

  useEffect(() => {
    initWeatherState();
  }, [initWeatherState]);
  return weather;
}

export default useWeather;
