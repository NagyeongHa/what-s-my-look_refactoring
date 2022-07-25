import { useRecoilValue } from 'recoil';
import {
  likedImagesState,
  nonLoginLikedImagesState,
} from '../recoil/apiCallSelector';
import '../styles/Look.css';
import NavBar from '../components/NavBar';
import Like from '../components/Like';
import { authState } from '../recoil/authState';
import { update, ref, push, child, onValue } from 'firebase/database';
import { database } from '../components/firebase';
import _ from 'lodash';
import { IimageDataProperty } from '../types/IimageDataProperty';
import { useEffect } from 'react';

function Liked(): JSX.Element {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const likedImages: IimageDataProperty[] = JSON.parse(
    getLikedImagesState || '[]'
  ); //로그인 좋아요

  const getUnAuthedLikeImage = useRecoilValue(nonLoginLikedImagesState);
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage || '[]'); //비로그인 좋아요

  const authUser = useRecoilValue(authState);

  useEffect(() => {
    //파이어베이스 저장
    const saveUserFirebase = (images: IimageDataProperty) => {
      const imageIndex = (images.id as number) - 1;
      const getCountReference = ref(database, `database/look/${imageIndex}`);
      const newLikeKey = push(child(ref(database), 'likes')).key;
      const getLikesReference = ref(
        database,
        `database/look/${imageIndex}/likes/${newLikeKey}`
      );

      //유저저장
      update(getLikesReference, {
        user: authUser.email,
        uuid: newLikeKey,
      });

      //카운트+1
      update(getCountReference, {
        count: (images.count as number) + 1,
      });
    };

    //파이어베이스 저장 시 유저 중복 체크
    const duplicateCheckUser = (images: IimageDataProperty) => {
      const imageIndex = (images.id as number) - 1;

      onValue(
        ref(database, `database/look/${imageIndex}/likes`),
        (snapshot) => {
          //likes배열 존재한다면
          if (snapshot.exists()) {
            const user: IimageDataProperty[] = Object.values(snapshot.val());

            //좋아요 누른 사람 중에 로그인한 유저의 이메일이 있다면
            if (user.map((item) => item.user === authUser.email)) {
              console.log('already exists...');
              return;
            }
          }
          //likes 배열 없거나 , 이메일 중복 아니라면 파이어베이스에 저장
          saveUserFirebase(images);
          return;
        }
      );
    };

    //비로그인 좋아요
    if (unAuthedLikeImage.length > 0 && authUser) {
      //비로그인 좋아요 사진 O & 로그인 좋아요 사진 X
      if (likedImages.length === 0) {
        //세션 -> 로컬 저장
        localStorage.setItem(
          'likedImages',
          JSON.stringify(_.uniqBy(unAuthedLikeImage, 'id'))
        );

        //파이어베이스 저장
        unAuthedLikeImage.map((images: IimageDataProperty) =>
          duplicateCheckUser(images)
        );

        //로컬로 옮기고 비로그인 세션 삭제
        sessionStorage.removeItem('nonLoginLikedImages');
        return;
      }

      //비로그인 좋아요 사진 O & 로그인 좋아요 사진 O
      if (likedImages.length > 0) {
        //비로그인 + 로그인 사진 합칠 배열 생성
        let mergeLikedImages: IimageDataProperty[] = [];
        mergeLikedImages = [...likedImages];

        //로그인배열에 비로그인배열 추가
        Object.keys(unAuthedLikeImage).map((key) => {
          mergeLikedImages.push(unAuthedLikeImage[key]);
        });

        //로컬에 추가
        localStorage.setItem(
          'likedImages',
          JSON.stringify(_.uniqBy(mergeLikedImages, 'id'))
        );

        const mergeLikeImagesNumberKey = Object.keys(mergeLikedImages).map(
          (key) => parseInt(key)
        );

        //파이어베이스 저장
        mergeLikeImagesNumberKey.map((key) =>
          duplicateCheckUser(mergeLikedImages[key])
        );

        //로컬로 옮기고 비로그인 세션 삭제
        sessionStorage.removeItem('nonLoginLikedImages');
      }
    }
  }, [authUser, likedImages, unAuthedLikeImage]);

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
