import { atom } from 'recoil';
import { TWeatherProps } from '../types/TWeatherProps';

export const weatherState = atom<TWeatherProps>({
  key: 'weatherState',
  default: { city: '', temp: 0 },
});
