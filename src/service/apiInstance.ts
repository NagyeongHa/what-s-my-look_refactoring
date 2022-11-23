import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const defaultApi = axios.create({
  baseURL: `${API_BASE_URL}`,
});

export const authApi = axios.create({
  baseURL: `${API_BASE_URL}`,
  withCredentials: true,
});

export const applyAccessToken = (token: string) => {
  authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAccessToken = () => {
  authApi.defaults.headers.common['Authorization'] = 'undefined';
};
