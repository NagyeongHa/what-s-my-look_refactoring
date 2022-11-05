import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { titleItems } from './titleImage';
import styled from 'styled-components';
import { CustomButton } from './Header';
import { useRecoilValue } from 'recoil';
import { weatherState } from '../recoil/weatherState';
import { TWeatherProps } from '../types/TWeatherProps';

const Carousel = () => {
  const weather = useRecoilValue<TWeatherProps>(weatherState);

  const scrollTo = () => {
    window.scrollTo(0, 1000);
  };

  return (
    <Slider autoplay={true} speed={650} className='slick-slider'>
      {titleItems.map((image) => (
        <LandingTheme key={image.id}>
          <img src={image.src} alt={'main-image'} />
          <LandingText>
            <h1>what&#8217;s my look?</h1>

            <WeatherInfo>
              {weather.city}{' '}
              {weather.temp ? `${Math.round(weather.temp)}℃` : 'Loading...'}
            </WeatherInfo>

            <p>매일 아침 무엇을 입을지 고민하시나요?</p>
            <p>오늘의 기온에 맞는 옷차림을 추천해드려요</p>

            <ScrollButton onClick={scrollTo}>
              기온별 옷차림 추천받기
            </ScrollButton>
          </LandingText>
        </LandingTheme>
      ))}
    </Slider>
  );
};

const LandingTheme = styled.div`
  @font-face {
    font-family: 'NanumBarunGothic';
    font-style: normal;
    font-weight: 400;
    src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
    src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix')
        format('embedded-opentype'),
      url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff')
        format('woff'),
      url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf')
        format('truetype');
  }

  img {
    display: block;
    position: relative;
    max-width: 100%;
    object-fit: cover;
    width: 100%;
    height: 100vh;
    scroll-snap-align: start;
    scroll-snap-type: y mandatory;
  }

  @media screen and (min-width: 768px) {
    img {
      object-position: top;
    }
  }
`;

const LandingText = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  position: fixed;
  text-align: center;
  bottom: 1.5rem;
  line-height: 2;
  letter-spacing: 0.01;
  color: #fff;
  width: 100vw;

  h1 {
    display: block;
    font-family: 'Frank Ruhl Libre', serif;
    font-size: 2rem;
  }

  p {
    font-family: 'NanumBarunGothic', sans-serif !important;
    text-shadow: 2px 1px 1px gray;
    font-size: 0.4rem;
  }

  @media screen and (min-width: 768px) {
    padding: 0 4rem;
    position: fixed;
    top: 13rem;
    font-size: 1.8rem;
    text-align: left;
    line-height: 2;
    letter-spacing: 0.01;
    color: #fff;

    h1 {
      font-size: 4rem;
      text-shadow: 2px 1px 1px gray;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const WeatherInfo = styled.span`
  font-family: 'Frank Ruhl Libre', serif;
  font-size: 2.5rem;
  text-shadow: 2px 1px 1px gray;
`;

const ScrollButton = styled(CustomButton)`
  margin-top: 1rem;
  padding: 0.4rem 1rem;
  font-family: 'NanumBarunGothic', sans-serif !important;
  font-size: 0.9rem;
  width: auto;
  height: 2.3rem;
  border-radius: 5px;
  border: none;
  letter-spacing: 3px;
  background-color: #fff;
`;

export default Carousel;
