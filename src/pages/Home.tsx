import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Look from '../components/Look';
import { useState, useEffect } from 'react';
import { TWeatherProps } from '../types/TWeatherProps';
import { weatherStateContext } from '../Context/weatherContext';
import { TWeatherPostionProps } from '../types/TWeatherPositionProps';

const Home = () => {
  const [weather, setWeather] = useState<TWeatherProps>({
    city: '',
    temp: 0,
  });

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const getWeather = (position: TWeatherPostionProps) => {
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

  const handleNav = () => {
    if (window.scrollY < 200) {
      setIsScroll(false);
    }

    if (window.scrollY > 500) {
      setIsScroll(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleNav);

    return () => {
      window.removeEventListener('scroll', handleNav);
    };
  }, []);

  console.log(isScroll);

  return (
    <>
      <weatherStateContext.Provider value={weather}>
        {isScroll && <Header />}
        <Carousel />
        <Look />
      </weatherStateContext.Provider>
    </>
  );
};
export default Home;
