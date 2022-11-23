import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Liked from './pages/Mypage';
import OAuthRedirect from './components/OAuthRedirect';
import useRefreshToken from './hooks/useRefreshToken';

const App = () => {
  //페이지리로드 시 silent-refresh
  useRefreshToken();

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/my' element={<Liked />} />
      <Route path='/oauth/:company/callback' element={<OAuthRedirect />} />
    </Routes>
  );
};

export default App;
