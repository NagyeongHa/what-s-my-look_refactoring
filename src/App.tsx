import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './routes/Home';
import Liked from './routes/Liked';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/liked' element={<Liked />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
