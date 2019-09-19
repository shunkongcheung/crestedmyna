import { useCallback, useEffect, useState } from "react";
import { useEditState } from "../Base/Fetches";

interface IHmeWeatherState {
  dataTime: Date;
  descDetail: string;
  descMain: string;
  humidity: number;
  iconUrl: string;
  location: string;
  temp: number;
  tempMax: number;
  tempMin: number;
}

interface IHmeWeatherFetchSubmit {
  latitude: number;
  longitude: number;
}
interface IHmeWeatherFetchRet {
  data_time: string;
  desc_detail: string;
  desc_main: string;
  humidity: number;
  icon_url: string;
  location: string;
  temp: number;
  temp_max: number;
  temp_min: number;
}
interface ICoord {
  longitude: number;
  latitude: number;
}

function useHmeWeather() {
  const isAuthenticated = true;
  const method = "POST";
  const { fetchEdit } = useEditState<
    IHmeWeatherFetchRet,
    IHmeWeatherFetchSubmit
  >(isAuthenticated, method);

  const [weatherState, setWeatherState] = useState<IHmeWeatherState>({
    dataTime: new Date(),
    descDetail: "",
    descMain: "",
    humidity: -1,
    iconUrl: "",
    location: "",
    temp: -1,
    tempMax: -1,
    tempMin: -1
  });
  // methods ---------- ----------------------------------
  const getLocationCoords = useCallback(async () => {
    if (!navigator.geolocation) return;
    return new Promise((resolve: (v: ICoord) => any) => {
      navigator.geolocation.getCurrentPosition(
        (position: { coords: ICoord }) => {
          const { coords } = position;
          return resolve(coords);
        }
      );
    });
  }, []);

  const initWeatherState = useCallback(
    async () => {
      const coords = await getLocationCoords();

      if (!coords) return;
      const { ok, payload } = await fetchEdit("home/hme_weather/info/", coords);
      if (!ok) return;
      setWeatherState(() => ({
        dataTime: new Date(payload.data_time),
        descDetail: payload.desc_detail,
        descMain: payload.desc_main,
        humidity: payload.humidity,
        iconUrl: payload.icon_url,
        location: payload.location,
        temp: payload.temp,
        tempMax: payload.temp_max,
        tempMin: payload.temp_min
      }));
    },
    [fetchEdit, getLocationCoords]
  );

  // fetch data for once ----------------------------------
  useEffect(
    () => {
      initWeatherState();
    },
    [initWeatherState]
  );
  return weatherState;
}

export default useHmeWeather;
