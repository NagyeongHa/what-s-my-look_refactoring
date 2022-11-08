// import unLike from '../assets/icon/empty-heart.png';
// import like from '../assets/icon/full-heart.png';
// import '../styles/like.css';
// import { useState, useEffect } from 'react';
// import { update, ref, push, child, remove } from 'firebase/database';
// import { useRecoilValue } from 'recoil';
// import { authState } from '../recoil/authState';
// import { database } from './firebase';
// import _ from 'lodash';
// import { IImageDataProperty } from '../types/IimageDataProperty';

// const Like = ({ images }: IImageDataProperty) => {
//   const [isLike, setIsLike] = useState(false);
//   const [lookDatabase, setLookDatabase] = useState({});
//   const [unAuthedUser, setUnAuthedUser] = useState(false);

//   const authUser = useRecoilValue(authState);
//   const imageIndex = (images.id - 1) as number;
//   const getCountReference = ref(database, `database/look/${imageIndex}`);

//   console.log(images.id);

//   useEffect(() => {
//     if (!authUser) {
//       setUnAuthedUser(true);
//     }

//     return () => setUnAuthedUser(false);
//   }, [authUser]);

//   useEffect(() => {
//     const res = async () => {
//       await fetch(
//         `https://what-s-my-look-default-rtdb.firebaseio.com/database/look/${imageIndex}.json`
//       )
//         .then((response) => response.json())
//         .then((data) => setLookDatabase(data));
//     };

//     res();
//   }, [imageIndex]);

//   useEffect(() => {
//     //비로그인
//     const sessionData: IImageDataProperty[] = JSON.parse(
//       sessionStorage.getItem('nonLoginLikedImages') || '[]'
//     );

//     if (!authUser) {
//       if (
//         sessionData.find(
//           (item) => item.id === (lookDatabase as IImageDataProperty).id
//         )
//       ) {
//         setIsLike(true);
//         return;
//       }
//       setIsLike(false);
//       return;
//     }

//     //로그인
//     if (authUser) {
//       if ((lookDatabase as IImageDataProperty).likes) {
//         const userLiked = Object.values(
//           (lookDatabase as IImageDataProperty).likes
//         );

//         if (userLiked.find((item) => item.user === authUser.email)) {
//           setIsLike(true);
//           return;
//         }
//       }
//       setIsLike(false);
//       return;
//     }
//   }, [authUser, images.id, lookDatabase]);

//   const toggleLike = () => {
//     if (unAuthedUser) {
//       setIsLike(!isLike);
//       if (!isLike) {
//         alert(
//           '로그인 시 위시리스트에서 좋아요한 이미지를 확인하실 수 있습니다.'
//         );
//       }
//     }

//     if (isLike) {
//       downLike();
//       deletelikedImages();
//       return;
//     }

//     if (!isLike) {
//       upLike();
//       addLikedImages();
//       return;
//     }
//   };

//   const upLike = () => {
//     setIsLike(true);

//     if (authUser) {
//       const newLikeKey = push(child(ref(database), `likes`)).key;
//       const getLikesReference = ref(
//         database,
//         `database/look/${imageIndex}/likes/${newLikeKey}`
//       );

//       update(getLikesReference, {
//         user: authUser.email,
//         uuid: newLikeKey,
//       });

//       update(getCountReference, {
//         count: (lookDatabase as IImageDataProperty).count + 1,
//       });
//     }
//   };

//   //좋아요 취소
//   const downLike = () => {
//     setIsLike(false);

//     //로그인
//     if (authUser && (lookDatabase as IImageDataProperty).likes) {
//       const toArray = Object.values((lookDatabase as IImageDataProperty).likes);
//       const userFilter = toArray.filter((item) => item.user === authUser.email);
//       const likesUuid = userFilter[0].uuid;

//       const removeUserReference = ref(
//         database,
//         `database/look/${imageIndex}/likes/${likesUuid}`
//       );

//       remove(removeUserReference);

//       //카운트-1
//       update(getCountReference, {
//         count: (lookDatabase as IImageDataProperty).count - 1,
//       });
//     }
//   };

//   //선택된 이미지 로컬에 추가
//   const addLikedImages = () => {
//     //로그인
//     if (authUser) {
//       const prevLocalLike = JSON.parse(
//         localStorage.getItem('likedImages') || '[]'
//       );

//       localStorage.setItem(
//         'likedImages',
//         JSON.stringify(_.uniqBy([...prevLocalLike, images], 'id'))
//       );
//       return;
//     }

//     //비로그인
//     if (unAuthedUser) {
//       const prevSessionImages = JSON.parse(
//         sessionStorage.getItem('nonLoginLikedImages') || '[]'
//       );

//       sessionStorage.setItem(
//         'nonLoginLikedImages',
//         JSON.stringify(_.uniqBy([...prevSessionImages, images], 'id'))
//       );
//     }
//   };

//   //선택된 이미지 로컬에 제거
//   const deletelikedImages = () => {
//     //로그인
//     if (authUser) {
//       const getLocalImages = JSON.parse(
//         localStorage.getItem('likedImages') || '[]'
//       );

//       if (getLocalImages) {
//         const deleteLikedImages = getLocalImages.filter(
//           (item: IImageDataProperty) => item.id !== images.id
//         );

//         localStorage.setItem('likedImages', JSON.stringify(deleteLikedImages));
//       }
//       return;
//     }

//     //비로그인
//     if (unAuthedUser) {
//       const prevSessionImages = JSON.parse(
//         sessionStorage.getItem('nonLoginLikedImages') || '[]'
//       );

//       const deleteLikedImages = prevSessionImages.filter(
//         (item: IImageDataProperty) => item.id !== images.id
//       );

//       sessionStorage.setItem(
//         'nonLoginLikedImages',
//         JSON.stringify(deleteLikedImages)
//       );
//     }
//   };

//   return (
//     <>
//       <div className='like-container'>
//         <button onClick={toggleLike}>
//           <img src={isLike ? like : unLike} alt='' className='icon like' />
//         </button>
//         {authUser ? (lookDatabase as IImageDataProperty).count : ''}
//       </div>
//     </>
//   );
// };

// export default Like;

import React, { useEffect, useState } from 'react';
import { ILook } from '../types/ILookProperty';
import { defaultApi } from '../utils/apiInstance';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import styled from 'styled-components';
import { ILike } from '../types/ILikeProperty';
import theme from '../styles/theme';

const Like = ({ post_id }: Pick<ILook, 'post_id'>) => {
  const [isClick, setIsClick] = useState(false);
  const [likes, setLikes] = useState<ILike>({ total: 0, alreadyLiked: false });
  const sns_id = 'admin';

  useEffect(() => {
    defaultApi
      .get(`/like/check/${post_id}/${sns_id}`)
      .then((res) => setLikes(res.data))
      .catch((err) => console.log(err));
  }, [post_id, isClick]);

  const upLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await defaultApi.post('/like', { post_id, sns_id });
    setIsClick(!isClick);
  };

  const unLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await defaultApi.delete('/like', {
      data: {
        post_id,
        sns_id,
      },
    });

    setIsClick(!isClick);
  };

  return (
    <LikeWrapper>
      {likes.alreadyLiked ? (
        <Button onClick={unLikeHandler}>
          <BsFillHeartFill
            className='like-icon'
            color='#f10b0b'
            size='1.3rem'
          />
        </Button>
      ) : (
        <Button onClick={upLikeHandler}>
          <BsHeart size='1.3rem' />
        </Button>
      )}
      <span>좋아요{likes.total}개</span>
    </LikeWrapper>
  );
};
const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: start;

  span {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const Button = styled.button`
  margin-left: 0.3rem;
  background: none;
  border: none;
  padding-top: 0.2rem;

  @media ${theme.device.desktop} {
    margin: 0;
  }
`;
export default Like;
