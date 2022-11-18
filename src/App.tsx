import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './pages/Home';
import Loading from './components/Loading';
import Liked from './pages/Liked';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <GlobalStyles />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/liked' element={<Liked />} />
            </Routes>
          </Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
