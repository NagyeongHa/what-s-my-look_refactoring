import { authApi, defaultApi } from './apiInstance';

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

// export const getMyLikesList =async (params:type) => {
//   const {data} =
// }

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

// export const logout = async ()=> {
//   const
// }
