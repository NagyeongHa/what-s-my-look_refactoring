import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authedUserState } from '../../recoil/authedUserState';
import { getMyLikesList } from '../../service/api';
import { ProfileWrapper } from './Profile';
import { ILook } from '../../types/ILookProperty';
import LookDetailModal from '../modal/LookDetailModal';
import { isBrowser } from 'react-device-detect';
import { useState } from 'react';
import MyLikesItem from './MyLikesItem';

const MyLikesList = () => {
  const [onModal, setOnModal] = useState(false);
  const { sns_id } = useRecoilValue(authedUserState);

  const { data } = useQuery<ILook[]>({
    queryKey: ['myLikesList', sns_id],
    queryFn: () => getMyLikesList(sns_id),
    enabled: !!sns_id,
  });

  const handleModal = (e: React.MouseEventHandler<HTMLDivElement>) => {
    if (isBrowser) {
      return setOnModal(true);
    }
    console.log(e);
  };

  const handleOnModalProp = (bool: boolean) => {
    setOnModal(bool);
  };

  // const sendPostIdToModal = (e: React.MouseEventHandler<HTMLImageElement>) => {
  //   // console.log(post_id);
  //   console.log(e);
  // };
  return (
    <LikesListWrapper>
      좋아요한 게시글 ({data?.length})
      <hr />
      <div>
        {data &&
          data.map((post) => <MyLikesItem post={post} key={post.post_id} />)}
      </div>
    </LikesListWrapper>
  );
};

const LikesListWrapper = styled(ProfileWrapper)`
  text-align: start;
  height: auto;
  margin-top: 3rem;
  padding: 0.3rem;

  & > div {
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 0.8rem;
  }
`;

export default MyLikesList;
