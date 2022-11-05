import { IImageDataProperty } from '../types/IImageDataProperty';
import { update, ref, push, child, onValue } from 'firebase/database';
import { database } from './firebase';

//파이어베이스 저장
export const saveUserFirebase = (
  images: IImageDataProperty,
  userEmail: string
) => {
  const imageIndex = images.id - 1;
  const getCountReference = ref(database, `database/look/${imageIndex}`);
  const newLikeKey = push(child(ref(database), 'likes')).key;
  const getLikesReference = ref(
    database,
    `database/look/${imageIndex}/likes/${newLikeKey}`
  );

  //파이어베이스 저장 시 유저 중복 체크
  onValue(ref(database, `database/look/${imageIndex}/likes`), (snapshot) => {
    //likes배열 존재한다면
    if (snapshot.exists()) {
      const user: IImageDataProperty[] = Object.values(snapshot.val());

      //좋아요 누른 사람 중에 로그인한 유저의 이메일이 있다면
      if (user.map((item) => item.user === userEmail)) {
        console.log('already exists...');
        return;
      }
    }
    //likes 배열 없거나 , 이메일 중복 아니라면 파이어베이스에 저장
    //유저저장
    update(getLikesReference, {
      user: userEmail,
      uuid: newLikeKey,
    });

    //카운트+1
    update(getCountReference, {
      count: images.count + 1,
    });
    return;
  });
};
