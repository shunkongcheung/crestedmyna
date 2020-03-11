import { query } from "express-validator";
import fetch from "node-fetch";
import queryString from "query-string";

import getController from "../getController";
import { User } from "../entities";
import { Request } from "express";

interface QueryParams {
  q?: string;
  lat?: number;
  lon?: number;
}

interface Weather {
  icon: string;
  main: string;
  description: string;
}

interface WeatherResPayload {
  weather: Array<Weather>;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  name: string;
  dt: number;
}

const validations = [
  query("longitude")
    .isNumeric()
    .optional(),
  query("latitude")
    .isNumeric()
    .optional()
];

function getCelciusFromKelvin(kelvin: number) {
  return kelvin - 273;
}

function getCurWeather(model: any, req: Request) {
  // latitude = 22.4271604, longitude = 114.2110166
  const { latitude, longitude } = req.params;
  if (!latitude || !longitude) return getCurWeatherInHongHong();
  return getCurWeatherByCoord(Number(latitude), Number(longitude));
}

async function getCurWeatherByCoord(latitude: number, longitude: number) {
  const params = { lat: latitude, lon: longitude };
  const payload = await getWeatherPayload(params);
  return getDataFromPayload(payload);
}

async function getCurWeatherInHongHong() {
  const params = { q: "Hong Kong,HK" };
  const payload = await getWeatherPayload(params);
  return getDataFromPayload(payload);
}

function getDataFromPayload(payload: WeatherResPayload) {
  const icon = payload.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const temp = getCelciusFromKelvin(payload.main.temp);
  const tempMax = getCelciusFromKelvin(payload.main.temp_max);
  const tempMin = getCelciusFromKelvin(payload.main.temp_min);
  const descMain = payload.weather[0].main;
  const descDetail = payload.weather[0].description;
  const humidity = payload.main.humidity;
  const location = payload.name;
  const dataTime = new Date(payload.dt * 1000);
  const data = {
    dataTime,
    descMain,
    descDetail,
    humidity,
    iconUrl,
    location,
    temp,
    tempMax,
    tempMin
  };
  return data;
}

async function getWeatherPayload(params: QueryParams) {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const queryParams = { ...params, appid: process.env.WEATHER_API_KEY };
  const queryStr = queryString.stringify(queryParams);
  const response = await fetch(`${url}?${queryStr}`);

  const payload = await response.json();
  const statusCode = response.status;
  if (statusCode < 200 || statusCode >= 300) throw Error(payload.message);
  return payload;
}

const controller = getController({
  allowedMethods: ["retrieve"],
  authenticated: false,
  getEntity: getCurWeather as any,
  model: User, // it always requires a model, give it to him for no usage
  retrieveUrl: "/",
  validations: { retrieve: validations }
});

export default controller;
