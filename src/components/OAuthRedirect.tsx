import axios from 'axios';
import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authedUserState } from '../recoil/authedUserState';
import { Login, silentRefreshToken } from '../service/api';
import { applyAccessToken, authApi } from '../service/apiInstance';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = useParams();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params?.get('state');
  // const setUserInfoState = useSetRecoilState(authedUserState);
  const [userInfo, setUserInfoState] = useRecoilState(authedUserState);
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

  // console.log(userInfo);

  //토큰을 만료시엔 로그아웃 페이지 이동시엔 액세스발급으로 로그인 유지

  // 1.엑세스토큰을 로컬에 저장
  // 클라쪽에선 로컬에 토큰있으면 로그인된거로 판별하고 회원정보 보여준다
  // 그러나 요청시에 토큰을 서버에 같이 보내고 서버에서 토큰이 맞지 않으면 오류를 보낸다
  // 페이지 리로드 될 때 silent-refresh 요청한다 여기서 받은 엑세스 다시 로컬에 저장
  // 엑세스 토큰 만료되면 silent-refresh 보냄
  // 리프레쉬가 만료되면? 로그아웃 후 다시 로그인

  // 2.엑세스 토큰을 헤더에 저장
  // 클라쪽에선 로컬에 저장되지 않고 헤더 기본값으로 저장한다
  // 로그인유지를 위해 페이지 리로드 될 시 silent-refresh 요청한다
  // 똑같이 서버에서 토큰 유효하지 않으면 오류 보낸다
  // 엑세스 도큰 만료되면 silent-refresh 보내고

  return <div>Loading....</div>;
};

export default OAuthRedirect;
