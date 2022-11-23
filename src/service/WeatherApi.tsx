import { weatherState } from '../recoil/weatherState';
import { TWeatherProps } from '../types/TWeatherProps';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';
import { defaultApi } from './apiInstance';

function WeatherApi() {
  const setWeather = useSetRecoilState<TWeatherProps>(weatherState);

  useEffect(() => {
    const getWeather = (position: GeolocationPosition) => {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const weatherApiCall = async () => {
        const response = await defaultApi.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        return response.data;
      };

      weatherApiCall().then((weatherValue) =>
        setWeather({
          city: weatherValue.name,
          temp: weatherValue.main.temp,
        })
      );
    };

    const getCurrentWeather = () => {
      navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);
    };

    const getWeatherError = () => {
      console.error("CAN'T GET API");
    };

    getCurrentWeather();
  }, [setWeather]);

  return <></>;
}

export default WeatherApi;
