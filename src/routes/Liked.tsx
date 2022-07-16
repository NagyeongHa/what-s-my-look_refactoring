import { useRecoilValue } from 'recoil';
import {
  likedImagesState,
  nonLoginLikedImagesState,
} from '../recoil/apiCallSelector';
import '../styles/Look.css';
import NavBar from '../components/NavBar';
import Like from '../components/Like';
// import { useEffect } from 'react';
import { authState } from '../recoil/authState';
import { update, ref, push, child, onValue } from 'firebase/database';
import { database } from '../components/firebase';
import _ from 'lodash';
import { IimageDataProperty } from '../types/IimageDataProperty';

function Liked(): JSX.Element {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const likedImages: IimageDataProperty[] = JSON.parse(
    getLikedImagesState || '[]'
  ); //로그인 좋아요
  const getUnAuthedLikeImage = useRecoilValue(nonLoginLikedImagesState);
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage || '[]'); //비로그인 좋아요
  const authUser = useRecoilValue(authState);

  //파이어베이스 저장
  const saveUserFirebase = (item: IimageDataProperty) => {
    const imageIndex = item.id - 1;
    const getCountReference = ref(database, `database/look/${imageIndex}`);
    const newLikeKey = push(child(ref(database), 'likes')).key;

    const likeData = {
      user: authUser.email,
      uuid: newLikeKey,
    };

    let updates: any = {};
    const updateReference = `/database/look/${imageIndex}/likes/` + newLikeKey;
    updates[updateReference] = likeData;
    update(ref(database), updates);

    //카운트+1
    update(getCountReference, {
      count: item.count + 1,
    });
  };

  //유저 중복 체크
  const duplicateCheckUser = (images: IimageDataProperty) => {
    const imageIndex = images.id - 1;

    onValue(ref(database, `database/look/${imageIndex}/likes`), (snapshot) => {
      if (snapshot.exists()) {
        const user: IimageDataProperty[] = Object.values(snapshot.val());
        if (user.map((item) => item.user !== authUser.email)) {
          saveUserFirebase(images);
          return;
        }
        console.log('already exists...');
      }
      saveUserFirebase(images);
    });
  };

  //로그인했을 때 비로그인 좋아요 사진 있다면
  if (unAuthedLikeImage && authUser) {
    //비로그인 좋아요 O & 로그인 좋아요 X
    if (!likedImages) {
      localStorage.setItem('likedImages', JSON.stringify(unAuthedLikeImage));
      unAuthedLikeImage.map((images: IimageDataProperty) =>
        duplicateCheckUser(images)
      );
      //로컬로 옮기고 비로그인 세션 삭제
      sessionStorage.removeItem('nonLoginLikedImages');
    }

    //비로그인 좋아요 O & 로그인 좋아요 O
    if (likedImages) {
      //로그인 좋아요 이미지 객체에 비로그인 좋아요 이미지 추가
      for (let i = 0; i < unAuthedLikeImage.length; i++) {
        const mergeLikeImages = likedImages.concat(unAuthedLikeImage[i]);

        //로그인 좋아요 + 비로그인 좋아요 (mergeLikeImages) 를 로컬에 저장
        localStorage.setItem(
          'likedImages',
          JSON.stringify(_.uniqBy(mergeLikeImages, 'id'))
        );

        const mergeLikeImagesNumberKey = Object.keys(mergeLikeImages).map(
          (key) => parseInt(key)
        );

        mergeLikeImagesNumberKey.map((key) => {
          duplicateCheckUser(mergeLikeImages[key]);
        });
      }

      //로컬로 옮기고 비로그인 세션 삭제
      sessionStorage.removeItem('nonLoginLikedImages');
    }
  }

  return (
    <>
      <NavBar />
      <div className='card likedPage'>
        {likedImages ? (
          Object.values(likedImages).map((item, idx) => (
            <div key={idx}>
              <img src={item.src} key={item.id} className='image' />
              <div className='icon-wrapper'>
                <Like images={item} />
              </div>
            </div>
          ))
        ) : (
          <div>이미지에 좋아요를 눌러보세요</div>
        )}
      </div>
    </>
  );
}

export default Liked;
