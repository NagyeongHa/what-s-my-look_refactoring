import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useState, useEffect } from 'react';
import { update, ref, push, child, remove } from 'firebase/database';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import { database } from './firebase';
import _ from 'lodash';
import { IimageDataProperty } from '../types/IimageDataProperty';
import { IimageProps } from '../types/IimageProps';

function Like({ images }: IimageProps) {
  const [isLike, setIsLike] = useState(false);
  const [lookDatabase, setLookDatabase] = useState({});
  const [unAuthedUser, setUnAuthedUser] = useState(false);

  const authUser = useRecoilValue(authState);
  const imageIndex: number = (images.id as number) - 1;
  const getCountReference = ref(database, `database/look/${imageIndex}`);

  useEffect(() => {
    if (!authUser) {
      setUnAuthedUser(true);
    }
  }, [authUser]);

  useEffect(() => {
    const res = async () => {
      await fetch(
        `https://what-s-my-look-default-rtdb.firebaseio.com/database/look/${imageIndex}.json`
      )
        .then((response) => response.json())
        .then((data) => setLookDatabase(data));
    };
    res();
  }, [imageIndex, isLike]);
  console.log(lookDatabase);

  //페이지 로딩 시 유저가 좋아요 했으면 빨간 하트
  useEffect(() => {
    // if ((lookDatabase as IimageDataProperty)?.likes) {
    //   return;
    // }
    // const userLiked = Object.values(
    //   (lookDatabase as IimageDataProperty)?.likes?.user
    // );
    // if (authUser && userLiked) {
    //   if (userLiked) {
    //     setIsLike(true);
    //     alert('hey');
    //     return;
    //   }
    //   setIsLike(false);
    // }
  }, []);

  //좋아요 클릭 시
  const toggleLike = () => {
    //비로그인
    if (unAuthedUser) {
      if (!isLike) {
        alert(
          '로그인 시 위시리스트에서 좋아요한 이미지를 확인하실 수 있습니다.'
        );
      }
    }

    if (isLike) {
      downLike();
      deletelikedImages();
      return;
    }

    if (!isLike) {
      upLike();
      addLikedImages();
      return;
    }
  };

  //좋아요
  const upLike = () => {
    setIsLike(true);
    console.log('업');

    //로그인
    if (authUser) {
      //likes안에 저장될 고유키 생성
      const newLikeKey = push(child(ref(database), `likes`)).key as string;
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
        count: ((lookDatabase as IimageDataProperty).count as number) + 1,
      });
    }
  };

  //좋아요 취소
  const downLike = () => {
    setIsLike(false);
    console.log('다운');

    //로그인
    if (authUser && (lookDatabase as IimageDataProperty).likes) {
      const toArray = Object.values((lookDatabase as IimageDataProperty).likes);
      const userFilter = toArray.filter((item) => item.user === authUser.email);
      const likesUuid = userFilter[0].uuid;

      const removeUserReference = ref(
        database,
        `database/look/${imageIndex}/likes/${likesUuid}`
      );

      remove(removeUserReference);

      //카운트-1
      update(getCountReference, {
        count: ((lookDatabase as IimageDataProperty).count as number) - 1,
      });
    }
  };

  //선택된 이미지 로컬에 추가
  const addLikedImages = () => {
    //로그인
    if (authUser) {
      const prevLocalLike = JSON.parse(
        localStorage.getItem('likedImages') || '[]'
      );

      localStorage.setItem(
        'likedImages',
        JSON.stringify(_.uniqBy([...prevLocalLike, images], 'id'))
      );
      return;
    }

    //비로그인
    if (unAuthedUser) {
      const prevSessionImages = JSON.parse(
        sessionStorage.getItem('nonLoginLikedImages') || '[]'
      );

      sessionStorage.setItem(
        'nonLoginLikedImages',
        JSON.stringify(_.uniqBy([...prevSessionImages, images], 'id'))
      );
    }
  };

  //선택된 이미지 로컬에 제거
  const deletelikedImages = () => {
    //로그인
    if (authUser) {
      const getLocalImages = JSON.parse(
        localStorage.getItem('likedImages') || '[]'
      );

      if (getLocalImages) {
        const deleteLikedImages = getLocalImages.filter(
          (item: IimageDataProperty) => item.id !== images.id
        );

        localStorage.setItem('likedImages', JSON.stringify(deleteLikedImages));
      }
      return;
    }

    //비로그인
    if (unAuthedUser) {
      const prevSessionImages = JSON.parse(
        sessionStorage.getItem('nonLoginLikedImages') || '[]'
      );

      const deleteLikedImages = prevSessionImages.filter(
        (item: IimageDataProperty) => item.id !== images.id
      );

      sessionStorage.setItem(
        'nonLoginLikedImages',
        JSON.stringify(deleteLikedImages)
      );
    }
  };

  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        {authUser ? ((lookDatabase as IimageDataProperty).count as number) : ''}
      </div>
    </>
  );
}

export default Like;
