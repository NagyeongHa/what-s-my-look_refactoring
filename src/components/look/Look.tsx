// import '../styles/Look.css';
// import Like from './Like';
// import { useContext, useState, useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
// import { getImageApi } from '../recoil/apiCallSelector';
// import { weatherStateContext } from '../Context/weatherContext';
// import { IImageDataProperty } from '../types/IimageDataProperty';

// const Look = () => {
//   const lookList = ['casual', 'modern', 'street', 'romantic'];
//   const images = useRecoilValue(getImageApi);
//   const weather = useContext(weatherStateContext);
//   const temp = Math.round(weather.temp);
//   const [nowTemp, setNowTemp] = useState(0);
//   const [imgArray, setImgArray] = useState<IImageDataProperty[]>([]);
//   const [isClick, setIsClick] = useState(false);

//   console.log('this is for commit');

//   useEffect(() => {
//     const weatherLevel = {
//       highTemp: temp >= 28,
//       summer: temp >= 23 && temp < 28,
//       spring: temp >= 20 && temp <= 22,
//       middleTemp: temp >= 17 && temp <= 19,
//       autumn: temp >= 12 && temp <= 16,
//       iffy: temp >= 9 && temp <= 11,
//       winter: temp >= 5 && temp <= 8,
//       lowTemp: temp <= 4,
//     };
//4도이하 / 5~8 / 9~11/ 12~16/17-19/20-22/23-28/ 28도이상
//0 / 4/ 5/ 9/12/ 17/20 /23/ 27
//     const {
//       highTemp,
//       summer,
//       spring,
//       middleTemp,
//       autumn,
//       iffy,
//       winter,
//       lowTemp,
//     } = weatherLevel;

//     if (highTemp) {
//       setNowTemp(27);
//       return;
//     }
//     if (summer) {
//       setNowTemp(23);
//       return;
//     }
//     if (spring) {
//       setNowTemp(20);
//       return;
//     }
//     if (middleTemp) {
//       setNowTemp(17);
//       return;
//     }
//     if (autumn) {
//       setNowTemp(12);
//       return;
//     }
//     if (iffy) {
//       setNowTemp(9);
//       return;
//     }
//     if (winter) {
//       setNowTemp(5);
//       return;
//     }
//     if (lowTemp) {
//       setNowTemp(4);
//       return;
//     }

//     return () => setNowTemp(0);
//   }, [temp]);

//   const defaultArray = Object.values(images as object).filter(
//     (image) => image.temperature === nowTemp
//   );

//   const lookButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const buttonName = (e.target as HTMLButtonElement).textContent;
//     const result = Object.values(images as object).filter(
//       (image) => image.look === buttonName && image.temperature === nowTemp
//     );

//     setImgArray(result);
//     setIsClick(true);
//   };

//   return (
//     <>
//       <div className='filter'>
//         {lookList.map((item, idx) => (
//           <button key={idx} onClick={lookButtonClick} className='filter-button'>
//             {item}
//           </button>
//         ))}
//       </div>

//       <div className='card'>
//         {isClick
//           ? imgArray.map((item) => (
//               <div key={item.id} className='image-box'>
//                 <img src={item.src} key={item.id} className='image' />
//                 <div className='icon-wrapper'>
//                   <Like images={item} />
//                 </div>
//               </div>
//             ))
//           : defaultArray.map((item) => (
//               <div key={item.id} className='image-box'>
//                 <img src={item.src} key={item.id} className='image' />
//                 <div className='icon-wrapper'>
//                   <Like images={item} />
//                 </div>
//               </div>
//             ))}
//       </div>
//     </>
//   );
// };

// export default Look;

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { weatherState } from '../../recoil/weatherState';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import { defaultApi } from '../../utils/apiInstance';
import LookItem from './LookItem';
import StyleFilter from '../StyleFilter';

const Look = () => {
  const [lookData, setLookData] = useState<ILook[]>([]);
  const [style, setStyle] = useState('');
  const temperature = useRecoilValue(weatherState);
  const roundTemperature = Math.round(temperature.temp);
  console.log(lookData);

  useEffect(() => {
    defaultApi
      .get(`/post/image?temperature=${roundTemperature}&style=${style}`)
      .then((res) => setLookData(res.data))
      .catch((err) => console.log(err));
  }, [roundTemperature, style]);

  const selectStyle = (styleState: string) => {
    setStyle(styleState);
  };

  return (
    <div>
      <StyleFilter selectStyleHandler={selectStyle} />
      <LookContainer>
        {lookData.map((item) => (
          <LookCard key={item.post_id}>
            <LookItem post={item} />
          </LookCard>
        ))}
      </LookContainer>
    </div>
  );
};

const LookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${theme.device.desktop} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    width: 1500px;
    text-align: center;
    margin: 0 auto;
  }
`;

const LookCard = styled.div`
  margin: 0.8rem 0;

  &:first-child {
    margin-top: 0rem;
  }

  @media ${theme.device.desktop} {
    width: 24rem;
    padding: 1.3rem 1.8rem;
    margin: 0 0.5rem;
  }
`;
export default Look;
