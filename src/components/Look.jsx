import '../styles/Look.css';
import Like from './Like';
import { useContext, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getImageApi } from '../recoil/apiCallSelector';
import { weatherStateContext } from '../Context/weatherContext';

function Look() {
  const lookList = ['casual', 'modern', 'street', 'romantic'];
  const images = useRecoilValue(getImageApi);
  const weather = useContext(weatherStateContext);
  const temp = weather.temp;
  const [nowTemp, setNowTemp] = useState(0);
  const [imgArray, setImgArray] = useState([]);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    if (temp >= 24) {
      setNowTemp(27);
      return;
    }
    if (temp >= 23 && temp < 28) {
      setNowTemp(23);
      return;
    }
    if (temp >= 20 && temp <= 22) {
      setNowTemp(20);
      return;
    }
    if (temp >= 17 && temp <= 19) {
      setNowTemp(17);
      return;
    }
    if (temp >= 12 && temp <= 16) {
      setNowTemp(12);
      return;
    }
    if (temp >= 9 && temp <= 11) {
      setNowTemp(9);
      return;
    }
    if (temp >= 5 && temp <= 8) {
      setNowTemp(5);
      return;
    }
    if (temp <= 4) {
      setNowTemp(4);
      return;
    }
  }, [temp]);

  console.log(temp.temp);
  const defaultArray = Object.values(images).filter(
    (item) => item.temperature === nowTemp
  );

  const onClick = (e) => {
    const buttonName = e.target.textContent;
    const result = Object.values(images).filter(
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
              onClick={onClick}
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
}

export default Look;
