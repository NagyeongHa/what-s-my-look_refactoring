import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { authedUserState } from '../recoil/authedUserState';
import { silentRefreshToken } from '../service/api';
import { applyAccessToken } from '../service/apiInstance';

const useRefreshToken = () => {
  const [userInfo, setUserInfo] = useRecoilState(authedUserState);
  const query = useQuery(['silentRefreshToken'], () => silentRefreshToken(), {
    refetchOnMount: true,
    enabled: !!userInfo.authenticated,
    onSuccess: (data) => {
      const accessToken = data.accessToken;
      const userInfo = data.userInfo;
      setUserInfo({ ...userInfo, authenticated: true });
      applyAccessToken(accessToken);
    },
  });

  // useEffect(() => {
  //   if (query.isError) {
  //     if (confirm('로그인이 만료되었습니다. 다시 로그인해주세요.')) {
  //       loginSetOnModal(true);
  //     }
  //   }

  // }, [query.isError]);

  return query;
};

export default useRefreshToken;
