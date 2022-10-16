import '../styles/Carousel.css';
import React, { useContext } from 'react';
import { weatherStateContext } from '../Context/weatherContext';
import { TWeatherProps } from '../types/TWeatherProps';

const WeatherInfo = () => {
  const weather = useContext<TWeatherProps>(weatherStateContext);

  const scrollTo = () => {
    window.scrollTo(0, 1000);
  };

  return (
    <div className='title'>
      <span>
        {weather.city}{' '}
        {weather.temp ? `${Math.round(weather.temp)}℃` : 'Loading...'}
      </span>
      <p>매일 아침 무엇을 입을지 고민하시나요?</p>
      <p>오늘의 기온에 맞는 옷차림을 추천해드려요</p>
      <button onClick={scrollTo}>기온별 옷차림 추천받기</button>
    </div>
  );
};

export default React.memo(WeatherInfo);
