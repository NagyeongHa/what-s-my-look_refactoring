import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authedUserState } from '../recoil/authedUserState';
import { Login } from '../service/api';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = useParams();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params?.get('state');
  const setUserInfoState = useSetRecoilState(authedUserState);

  const { data, isLoading, error } = useQuery({
    queryKey: ['socialLogin'],
    queryFn: () => Login(company, code, state),
  });

  useEffect(() => {
    if (error) console.log('login error', error);

    if (!isLoading) {
      setUserInfoState({ ...data.user, authenticated: true });
      return navigate('/');
    }
  }, [data, error, isLoading]);

  return <div>Loading....</div>;
};

export default OAuthRedirect;
