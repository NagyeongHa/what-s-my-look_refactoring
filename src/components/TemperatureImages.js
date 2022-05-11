import { weatherStateContext } from '../App';
import '../styles/TemperatureImages.css';
import { useContext, useEffect, useState } from 'react';
import { images } from './images';

// import TemperatureComment from './TemperatureComent';

function TemperatureImages() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);
  console.log('temp', temp);

  const [imgTemp, setImgTemp] = useState(temp);

  //   switch (temp) {
  //     case '>= 28':
  //       // return console.log('28도 이상임');
  //       return setImgTemp(28);
  //     case temp >= 23:
  //       // return console.log('23도 이상임');
  //       return setImgTemp(23);
  //     case temp >= 20:
  //       // return console.log('20도 이상임');
  //       return setImgTemp(20);
  //     case temp >= 17:
  //       // return console.log('17도 이상임');
  //       return setImgTemp(17);
  //     case temp >= 12:
  //       // return console.log('12도 이상임');
  //       return setImgTemp(12);
  //     case temp >= 9:
  //       // return console.log('9도 이상임');
  //       return setImgTemp(9);
  //     case temp >= 5:
  //       // return console.log('5도 이상임');
  //       return setImgTemp(5);
  //     case temp <= 4:
  //       // return console.log('4도 이하');
  //       return setImgTemp(4);
  //   }
  useEffect(() => {
    if (temp >= 28) {
      return setImgTemp(28);
    } else if (temp >= 23 && temp < 27) {
      return setImgTemp(23);
    } else if (temp >= 20 && temp <= 22) {
      return setImgTemp(20);
    } else if (temp >= 17 && temp <= 19) {
      return setImgTemp(17);
    } else if (temp >= 12 && temp <= 16) {
      return setImgTemp(12);
    } else if (temp >= 9 && temp <= 11) {
      return setImgTemp(9);
    } else if (temp >= 5 && temp <= 8) {
      return setImgTemp(5);
    } else if (temp <= 4) {
      return setImgTemp(4);
    }
  }, [imgTemp, temp]);

  console.log('lookTemp', imgTemp);

  const sortFilter = images.filter((img) => img.temperature === imgTemp);
  console.log('sortFilter', sortFilter);
  return (
    <div className='temp_look_img_container'>
      {sortFilter
        ? sortFilter.map((item) => (
            <img src={item.src} key={item.id} className='temp_look_img' />
          ))
        : null}
    </div>
  );
}

export default TemperatureImages;
