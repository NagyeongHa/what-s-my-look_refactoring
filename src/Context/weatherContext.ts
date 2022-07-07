import { createContext } from 'react';
import { IweatherValues } from '../types/IweatherValues';

export const weatherStateContext = createContext<IweatherValues>({
  city: '',
  temp: 17,
});
