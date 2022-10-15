import Carousel from '../components/Carousel';
import '../styles/global.css';
import Header from '../components/Header';
import Look from '../components/Look';
import { useState, useEffect } from 'react';
import { IweatherValues } from '../types/IweatherValues';
import { weatherStateContext } from '../Context/weatherContext';
import { IweatherPositionValues } from '../types/IweatherPositionValues';

const Home = () => {
  const [weather, setWeather] = useState<IweatherValues>({
    city: '',
    temp: 0,
  });

  useEffect(() => {
    const getWeather = (position: IweatherPositionValues) => {
      const API_KEY = `e123d48bb001a8c0ad07e24fc9cc04bb`;

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const weatherApiCall = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        return response.json();
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
  }, []);

  return (
    <>
      <weatherStateContext.Provider value={weather}>
        <Header />
        <Carousel />
        <Look />
      </weatherStateContext.Provider>
    </>
  );
};
export default Home;
