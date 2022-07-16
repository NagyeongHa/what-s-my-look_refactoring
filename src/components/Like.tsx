import unLike from '../assets/icon/empty-heart.png';
import like from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useState, useEffect } from 'react';
import { update, ref, onValue, push, child, remove } from 'firebase/database';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import { database } from './firebase';
import _ from 'lodash';
import { IimageProps } from '../types/IimageProps';

function Like({ images }: IimageProps) {
  const [isLike, setisLike] = useState(false);
  const [lookDatabase, setLookDatabase] = useState({});
  const [unAuthedUser, setUnAuthedUser] = useState(false);

  const imageIndex = images.id - 1;
  const authUser = useRecoilValue(authState);
  const getLikesUserReference = ref(
    database,
    `database/look/${imageIndex}/likes`
  );
  const getCountReference = ref(database, `database/look/${imageIndex}`);

  useEffect(() => {
    if (!authUser) {
      setUnAuthedUser(true);
    }
  }, [authUser]);

  useEffect(() => {
    const res = async () => {
      fetch(
        `https://what-s-my-look-default-rtdb.firebaseio.com/database/look/${imageIndex}.json`
      )
        .then((response) => response.json())
        .then((data) => setLookDatabase(data));
    };
    res();
  }, [imageIndex, isLike]);

  //페이지 로딩 시 유저가 좋아요 했으면 빨간 하트
  useEffect(() => {
    onValue(getLikesUserReference, (snapshot) => {
      if (snapshot.exists()) {
        const user = Object.values(snapshot.val()); //유저이메일
        //로그인했을 때 이미지별 좋아요 눌린 유저중에 로그인 유저랑 같은 사람이 있는지
        console.log(typeof user);
        if (authUser) {
          if (user.find((item) => item.user === authUser.email)) {
            setisLike(true);
          }
        }
      }
    });
  }, [getLikesUserReference, authUser, imageIndex]);

  //좋아요 클릭 시
  const toggleLike = () => {
    if (!authUser) {
      alert('로그인 시 위시리스트에서 좋아요한 이미지를 확인하실 수 있습니다.');
      // return;
    }

    if (isLike) {
      downLike();
      deletelikedImages();

      return;
    }
    upLike();
    addLikedImages();
  };

  //좋아요
  const upLike = () => {
    setisLike(true);

    //로그인
    if (authUser) {
      //likes안에 저장될 고유키 생성
      const newLikeKey = push(child(ref(database), `likes`)).key;

      //저장할 값 ( 이메일 , 고유키)
      const likeData = {
        user: authUser.email,
        uuid: newLikeKey,
      };

      //유저 저장
      const updates = {};
      updates[`/database/look/${imageIndex}/likes/` + newLikeKey] = likeData;
      update(ref(database), updates);

      //카운트+1
      update(getCountReference, {
        count: lookDatabase.count + 1,
      });
    }

    //비로그인
    if (unAuthedUser) {
      const prevLikedImages = JSON.parse(
        sessionStorage.getItem('nonLoginLikedImages') || '[]'
      );

      sessionStorage.setItem(
        'nonLoginLikedImages',
        JSON.stringify([...prevLikedImages, images])
      );
    }
  };
  //좋아요 취소
  const downLike = () => {
    setisLike(false);

    if (authUser && lookDatabase.likes) {
      const toArray = Object.values(lookDatabase.likes);
      const userFilter = toArray.filter((item) => item.user === authUser.email);
      const likesUuid = userFilter[0].uuid;

      const removeUserReference = ref(
        database,
        `database/look/${imageIndex}/likes/${likesUuid}`
      );

      remove(removeUserReference);

      //카운트-1
      update(getCountReference, {
        count: lookDatabase.count - 1,
      });
    }

    //비로그인
    if (unAuthedUser) {
      const getLikedImages = JSON.parse(
        sessionStorage.getItem('nonLoginLikedImages')
      );
      const deleteLikedImages = getLikedImages.filter(
        (item) => item.id !== images.id
      );

      sessionStorage.setItem(
        'nonLoginLikedImages',
        JSON.stringify(deleteLikedImages)
      );
    }
  };

  //선택된 이미지 로컬에 추가로컬에 추가
  const addLikedImages = () => {
    if (authUser) {
      const prevLikedImages = JSON.parse(
        localStorage.getItem('likedImages') || '[]'
      );

      localStorage.setItem(
        'likedImages',
        JSON.stringify(_.uniqBy([...prevLikedImages, images], 'id'))
      );
    }
  };
  //선택된 이미지 로컬에 제거
  const deletelikedImages = () => {
    if (authUser) {
      const getLikedImages = JSON.parse(localStorage.getItem('likedImages'));
      if (getLikedImages) {
        const deleteLikedImages = getLikedImages.filter(
          (item) => item.id !== images.id
        );

        localStorage.setItem('likedImages', JSON.stringify(deleteLikedImages));
      }
    }
  };

  return (
    <>
      <div className='like-container'>
        <button onClick={toggleLike}>
          <img src={isLike ? like : unLike} alt='' className='icon like' />
        </button>
        {authUser ? lookDatabase.count : ''}
      </div>
    </>
  );
}

export default Like;
