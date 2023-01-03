import { useRecoilValue } from 'recoil';
import Header from '../components/Header';
import MyLikesList from '../components/mypage/MyLikesList';
import Profile from '../components/mypage/Profile';
import { authedUserState } from '../recoil/authedUserState';

const Liked = () => {
  const { authenticated } = useRecoilValue(authedUserState);

  return (
    <div>
      {authenticated && (
        <>
          <Header />
          <Profile />
          <MyLikesList />
        </>
      )}
    </div>
  );
};

export default Liked;
