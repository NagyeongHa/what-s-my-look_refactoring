import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authedUserState } from '../../recoil/authedUserState';
import { getMyLikesList } from '../../service/api';
import { ProfileWrapper } from './Profile';
import { ILook } from '../../types/ILookProperty';
import MyLikesItem from './MyLikesItem';
import theme from '../../styles/theme';

const MyLikesList = () => {
  const { sns_id } = useRecoilValue(authedUserState);

  const { data } = useQuery<ILook[]>({
    queryKey: ['myLikesList', sns_id],
    queryFn: () => getMyLikesList(sns_id),
    enabled: !!sns_id,
  });

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
  width: 95vw;
  padding: 0;

  & > div {
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin: 0 auto;
    width: auto;
  }

  @media ${theme.device.desktop} {
    width: 70vw;
    padding: 0.3rem;

    & > div {
      padding: 0.8rem;
    }
  }
`;

export default MyLikesList;
