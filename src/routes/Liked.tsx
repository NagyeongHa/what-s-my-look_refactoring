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
import { IimageDummy } from '../types/IimagesDummy';
import { IlikesDummy } from '../types/IlikesUser';

function Liked() {
  const getLikedImagesState = useRecoilValue(likedImagesState);
  const likedImages = JSON.parse(getLikedImagesState || '[]'); //로그인 좋아요
  const getUnAuthedLikeImage = useRecoilValue(nonLoginLikedImagesState);
  const unAuthedLikeImage = JSON.parse(getUnAuthedLikeImage || '[]'); //비로그인 좋아요
  const authUser = useRecoilValue(authState);

  //파이어베이스 저장
  const saveUserFirebase = (item: IimageDummy) => {
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
  const duplicateCheckUser = (images: IimageDummy) => {
    const imageIndex = images.id - 1;

    onValue(ref(database, `database/look/${imageIndex}/likes`), (snapshot) => {
      if (snapshot.exists()) {
        const user: IlikesDummy[] = Object.values(snapshot.val());
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
      unAuthedLikeImage.map((images: IimageDummy) =>
        duplicateCheckUser(images)
      );
      //로컬로 옮기고 비로그인 세션 삭제
      sessionStorage.removeItem('nonLoginLikedImages');
      return;
    }

    //비로그인 좋아요 O & 로그인 좋아요 O
    if (likedImages) {
      let addNewLike = Object.keys(unAuthedLikeImage).map((key) => {
        likedImages.concat(unAuthedLikeImage[key]);
      });

      localStorage.setItem(
        'likedImages',
        JSON.stringify(_.uniqBy(addNewLike, 'id'))
      );

      Object.keys(addNewLike).map((key) => duplicateCheckUser(addNewLike[key]));

      //로컬로 옮기고 비로그인 세션 삭제
      sessionStorage.removeItem('nonLoginLikedImages');
    }
  }

  return (
    <>
      <NavBar />
      <div className='card likedPage'>
        {likedImages ? (
          Object.values(likedImages as object).map((item, idx) => (
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

// useEffect(() => {
//   //파이어베이스 유저정보 저장
//   const saveUserFirebase = (item: IimageDummy) => {
//     const imageIndex = item.id - 1;
//     const getCountReference = ref(database, `database/look/${imageIndex}`);

//     //likes안에 저장될 고유키 생성
//     const newLikeKey = push(child(ref(database), `likes`)).key;

//     //저장할 값 ( 이메일 , 고유키)7hg
//     const likeData = {
//       user: authUser.email,
//       uuid: newLikeKey,
//     };

//     //유저 중복 체크
//     onValue(
//       ref(database, `database/look/${imageIndex}/likes`),
//       (snapshot) => {
//         if (snapshot.exists()) {
//           const user:IlikesDummy[] = Object.values(snapshot.val());
//           if (user.map((user) => user.user !== authUser.email)) {
//             const updates = {};
//             updates[`/database/look/${imageIndex}/likes/` + newLikeKey] =
//               likeData;
//             update(ref(database), updates);

//             //카운트+1
//             update(getCountReference, {
//               count: item.count + 1,
//             });
//             return;
//           }
//           console.log('already exists...');
//         }
//         const updates = {};
//         updates[`/database/look/${imageIndex}/likes/` + newLikeKey] =
//           likeData;
//         update(ref(database), updates);

//         //카운트+1
//         update(getCountReference, {
//           count: item.count + 1,
//         });
//       }
//     );
//   };

//   //로그인했을 때 비로그인 좋아요 사진 있다면
//   if (unAuthedLikeImage && authUser) {
//     //비로그인 좋아요 O & 로그인 좋아요 X
//     if (!likedImages) {
//       localStorage.setItem('likedImages', JSON.stringify(unAuthedLikeImage));
//       unAuthedLikeImage.map((item) => saveUserFirebase(item));
//       //로컬로 옮기고 비로그인 세션 삭제
//       sessionStorage.removeItem('nonLoginLikedImages');
//       return;
//     }

//     //비로그인 좋아요 O & 로그인 좋아요 O
//     if (likedImages) {
//       let dataArray = [];
//       dataArray = likedImages;

//       Object.keys(unAuthedLikeImage).map((key) => {
//         dataArray.push(unAuthedLikeImage[key]);
//       });

//       dataArray = _.uniqBy(dataArray, 'id');
//       dataArray = [...dataArray];
//       localStorage.setItem('likedImages', JSON.stringify(dataArray));

//       Object.keys(dataArray).map((key) => saveUserFirebase(dataArray[key]));

//       //로컬로 옮기고 비로그인 세션 삭제
//       sessionStorage.removeItem('nonLoginLikedImages');
//     }
//   }
// }, [authUser, likedImages, unAuthedLikeImage]);
