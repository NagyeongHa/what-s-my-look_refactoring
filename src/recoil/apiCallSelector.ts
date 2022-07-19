import { atom, RecoilValue, selector } from 'recoil';

//파이어베이스에서 이미지 가져오기
export const getImageApi = selector({
  key: 'getImageApi',
  get: async () => {
    const res = await fetch(
      `https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json`
    );
    return res.json();
  },
});

//좋아요한 이미지 저장
export const likedImagesState = atom({
  key: 'likedImagesState',
  default: localStorage.getItem('likedImages'),
});

//비로그인 좋아요 이미지 저장
export const nonLoginLikedImagesState = atom({
  key: 'nonLoginLikedImagesState',
  default: sessionStorage.getItem('nonLoginLikedImages'),
});
