import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authedUserState } from '../recoil/authedUserState';
import { Login, silentRefreshToken } from '../service/api';
import { applyAccessToken } from '../service/apiInstance';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = useParams();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params?.get('state');
  const setUserInfoState = useSetRecoilState(authedUserState);

  const result = useQueries([
    {
      queryKey: ['socialLogin'],
      queryFn: () => Login(company, code, state),
    },
    {
      queryKey: ['accessToken'],
      queryFn: () => silentRefreshToken(),
    },
  ]);

  useEffect(() => {
    const isLoading = result.some((result) => result.isFetching); //false 완료
    const errorInfo = result.some((result) => result.error);

    if (errorInfo) {
      return console.log('로그인 에러');
    }

    if (!isLoading) {
      const userInfo = result[0].data.user;
      const accessToken = result[1].data.accessToken;

      setUserInfoState({ ...userInfo, authenticated: true });
      applyAccessToken(accessToken);

      return userInfo.sns_id && navigate('/');
    }
  }, [navigate, result, setUserInfoState]);
  return <div>Loading....</div>;
};

export default OAuthRedirect;
