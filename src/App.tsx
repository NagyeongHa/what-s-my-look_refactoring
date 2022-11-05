import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './pages/Home';
import Loading from './components/Loading';
import Liked from './pages/Liked';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <GlobalStyles />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/liked' element={<Liked />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
