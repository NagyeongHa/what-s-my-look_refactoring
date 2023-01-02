import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import OAuthRedirect from './components/OAuthRedirect';
import useRefreshToken from './hooks/useRefreshToken';
import { useRecoilValue } from 'recoil';
import { authedUserState } from './recoil/authedUserState';

const App = () => {
  const user = useRecoilValue(authedUserState);
  console.log(user);

  //페이지리로드 시 silent-refresh
  useRefreshToken();

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/my' element={<Mypage />} />
      <Route path='/oauth/:company/callback' element={<OAuthRedirect />} />
    </Routes>
  );
};

export default App;
