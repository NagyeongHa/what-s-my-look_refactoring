import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const defaultApi = axios.create({
  baseURL: `${API_BASE_URL}`,
});

export const getLooks = async (temperature: number, style: string) => {
  const { data } = await defaultApi.get(
    `/post/image?temperature=${temperature}&style=${style}`
  );
  return data;
};

export const getLookDetail = async (post_id: number) => {
  const { data } = await defaultApi.get(`/post/${post_id}`);
  return data;
};
