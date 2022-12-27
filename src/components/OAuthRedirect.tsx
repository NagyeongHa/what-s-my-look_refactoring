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
  // const [userInfo, setUserInfoState] = useRecoilState(authedUserState);
  // const { data, isError, error, isSuccess } = useQuery({
  //   queryKey: ['socialLogin'],
  //   queryFn: () => Login(company, code, state),
  //   onSuccess: (data) => {
  //     setUserInfoState(data.user);
  //   },
  //   onError: (error) => console.log(error),
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     useRefreshToken;
  //     navigate('/');
  //   }
  // }, [isSuccess]);

  // console.log(user);

  // useEffect(() => {
  //   // if (isError) {
  //   //   console.log('login error:', error);
  //   //   return;
  //   // }

  //   if (isSuccess) {
  //     const userInfo = data?.user;
  //     setUserInfoState(userInfo);

  //     navigate('/');
  //     return;
  //   }
  // }, [data]);

  const result = useQueries([
    {
      queryKey: ['socialLogin'],
      queryFn: () => Login(company, code, state),
    },
    {
      queryKey: ['silentRefreshToken'],
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
      console.log(result);
      console.log(result[0].data);
      console.log(result[1].data);

      const userInfo = result[0].data.user;
      const accessToken = result[1].data.accessToken;

      setUserInfoState(userInfo);
      applyAccessToken(accessToken);

      return userInfo.sns_id && navigate('/');
    }
  }, [navigate, result, setUserInfoState]);
  return <div>Loading....</div>;
};

export default OAuthRedirect;
