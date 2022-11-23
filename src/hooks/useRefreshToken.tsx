import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { authedUserState } from '../recoil/authedUserState';
import { LoginModalState } from '../recoil/LoginModalState';
import { silentRefreshToken } from '../service/api';
import { applyAccessToken, clearAccessToken } from '../service/apiInstance';

const useRefreshToken = () => {
  const setUserInfo = useSetRecoilState(authedUserState);
  const loginSetOnModal = useSetRecoilState(LoginModalState);
  return useQuery(['silentRefreshToken'], () => silentRefreshToken(), {
    // refetchInterval: 60 * 60 * 2 * 1000,
    // refetchOnMount: true,
    onSuccess: (data) => {
      const accessToken = data.accessToken;
      const userInfo = data.userInfo;
      console.log(data);
      setUserInfo(userInfo);
      applyAccessToken(accessToken);
    },
    onError: () => {
      clearAccessToken();
      if (confirm('로그인이 만료되었습니다. 다시 로그인해주세요.')) {
        loginSetOnModal(true);
      }
    },
  });
};

export default useRefreshToken;
