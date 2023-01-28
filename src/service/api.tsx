import { authApi, defaultApi } from './apiInstance';

export const getLooks = async (temperature: number, style: string) => {
  if (temperature < 2) {
    return (temperature = 2);
  }

  if (temperature > 27) {
    return (temperature = 27);
  }

  const { data } = await defaultApi.get(
    `/post/image?temperature=${temperature}&style=${style}`
  );
  console.log('data', data);

  return data;
};

export const getLookDetail = async (post_id: number) => {
  const { data } = await defaultApi.get(`/post/${post_id}`);
  return data;
};

export const Login = async (company: string, code: string, state: string) => {
  const { data } = await defaultApi.post(
    `/oauth/${company}/callback`,
    {
      code,
      state,
    },
    { withCredentials: true }
  );
  return data;
};

export const silentRefreshToken = async () => {
  const { data } = await authApi.get('/oauth/silent-refresh', {
    withCredentials: true,
  });
  return data;
};

export const logout = async () => {
  return await authApi.post('/oauth/logout', { withCredentials: true });
};

export const getUserAlreadyLiked = async (
  post_id: number,
  sns_id: string | number
) => {
  const { data } = await defaultApi.get(
    `/like/check?post_id=${post_id}&sns_id=${sns_id}`
  );
  return data;
};

export const upLike = async (newLike: Like) => {
  const { data } = await authApi.post('/like', newLike);
  return data;
};

interface Like {
  post_id: number;
  sns_id: string;
}

export const unLike = async (like: Like) => {
  const { data } = await authApi.delete('/like', { data: like });
  return data;
};

export const getMyLikesList = async (sns_id: string | number) => {
  const { data } = await authApi.get(`/like/${sns_id}`);
  return data;
};
