import '../styles/Look.css';
import Like from './Like';
import { useContext, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getImageApi } from '../recoil/apiCallSelector';
import { weatherStateContext } from '../Context/weatherContext';
import { IimageDataProperty } from '../types/IimageDataProperty';

const Look = () => {
  const lookList = ['casual', 'modern', 'street', 'romantic'];
  const images = useRecoilValue(getImageApi);
  const weather = useContext(weatherStateContext);
  const temp = Math.round(weather.temp);
  const [nowTemp, setNowTemp] = useState(0);
  const [imgArray, setImgArray] = useState<IimageDataProperty[]>([]);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const weatherLevel = {
      highTemp: temp >= 28,
      summer: temp >= 23 && temp < 28,
      spring: temp >= 20 && temp <= 22,
      middleTemp: temp >= 17 && temp <= 19,
      autumn: temp >= 12 && temp <= 16,
      iffy: temp >= 9 && temp <= 11,
      winter: temp >= 5 && temp <= 8,
      lowTemp: temp <= 4,
    };

    const {
      highTemp,
      summer,
      spring,
      middleTemp,
      autumn,
      iffy,
      winter,
      lowTemp,
    } = weatherLevel;

    if (highTemp) {
      setNowTemp(27);
      return;
    }
    if (summer) {
      setNowTemp(23);
      return;
    }
    if (spring) {
      setNowTemp(20);
      return;
    }
    if (middleTemp) {
      setNowTemp(17);
      return;
    }
    if (autumn) {
      setNowTemp(12);
      return;
    }
    if (iffy) {
      setNowTemp(9);
      return;
    }
    if (winter) {
      setNowTemp(5);
      return;
    }
    if (lowTemp) {
      setNowTemp(4);
      return;
    }
  }, [temp]);

  const defaultArray = Object.values(images as object).filter(
    (image) => image.temperature === nowTemp
  );

  const lookButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = (e.target as HTMLButtonElement).textContent;
    const result = Object.values(images as object).filter(
      (image) => image.look === buttonName && image.temperature === nowTemp
    );

    setImgArray(result);
    setIsClick(true);
  };

  return (
    <>
      <section>
        <div className='filter'>
          {lookList.map((item, idx) => (
            <button
              key={idx}
              id={idx}
              onClick={lookButtonClick}
              className='filter-button'
            >
              {item}
            </button>
          ))}
        </div>
        <div className='card'>
          {isClick
            ? imgArray.map((item, idx) => (
                <div key={idx} className='image-box'>
                  <img src={item.src} key={item.id} className='image' />
                  <div className='icon-wrapper'>
                    <Like images={item} />
                  </div>
                </div>
              ))
            : defaultArray.map((item, idx) => (
                <div key={idx} className='image-box'>
                  <img src={item.src} key={item.id} className='image' />
                  <div className='icon-wrapper'>
                    <Like images={item} />
                  </div>
                </div>
              ))}
        </div>
      </section>
    </>
  );
};

export default Look;
