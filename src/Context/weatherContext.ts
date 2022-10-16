import { createContext } from 'react';
import { TWeatherProps } from '../types/TWeatherProps';

export const weatherStateContext = createContext<TWeatherProps>({
  city: '',
  temp: 17,
});
