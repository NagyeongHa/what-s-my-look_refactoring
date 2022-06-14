//import { useEffect } from 'react';
import Carousel from '../components/Carousel';
import '../styles/global.css';
import NavBar from '../components/NavBar';
import Look from '../components/Look';
import Login from '../components/Login';
import { useState, useEffect, createContext } from 'react';

export const weatherStateContext = createContext(null);

function Home() {
  const [weather, setWeather] = useState({
    city: '',
    temp: '',
  });

  const getWeather = async (position) => {
    const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const json = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
    ).json();

    setWeather({
      city: json.name,
      temp: json.main.temp,
    });
  };

  useEffect(() => {
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
        <NavBar />
        <Carousel />
        <Look />
        <Login />
      </weatherStateContext.Provider>
    </>
  );
}
export default Home;
