import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Look from '../components/look/Look';
import { useState, useEffect } from 'react';
import WeatherApi from '../service/WeatherApi';
const Home = () => {
  const [isScroll, setIsScroll] = useState(false);

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

  // console.log(isScroll);

  return (
    <>
      <WeatherApi />
      {isScroll && <Header />}
      <Carousel />
      <Look />
    </>
  );
};
export default Home;
