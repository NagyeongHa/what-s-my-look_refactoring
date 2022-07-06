import Carousel from '../components/Carousel';
import '../styles/global.css';
import NavBar from '../components/NavBar';
import Look from '../components/Look';
import { useState, useEffect } from 'react';
import { IweatherValues } from '../types/IweatherValues';
import { weatherStateContext } from '../Context/weatherContext';

function Home() {
  const [weather, setWeather] = useState<IweatherValues>({
    city: '',
    temp: '',
  });

  useEffect(() => {
    const getWeather = (position: any) => {
      const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

      const lat: number = position.coords.latitude;
      const lon: number = position.coords.longitude;

      const weatherApiCall = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        return response.json();
      };

      weatherApiCall().then((weatherValue) =>
        setWeather({
          ...weather,
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
  }, [weather]);

  return (
    <>
      <weatherStateContext.Provider value={weather}>
        <NavBar />
        <Carousel />
        <Look />
      </weatherStateContext.Provider>
    </>
  );
}
export default Home;
