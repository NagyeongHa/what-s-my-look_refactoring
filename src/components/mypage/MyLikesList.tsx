import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
// import { authedUserState } from '../../recoil/authedUserState';
// import { getMyLikesList } from '../../service/api';
import { ProfileWrapper } from './Profile';

const MyLikesList = () => {
  // const { sns_id } = useRecoilValue(authedUserState);
  // const { data } = useQuery({
  //   queryKey: ['myLikesList'],
  //   queryFn: () => getMyLikesList(sns_id),
  // });

  // console.log(data);

  return (
    <LikesListWrapper>
      좋아요한 게시글 ()
      <hr />
    </LikesListWrapper>
  );
};

const LikesListWrapper = styled(ProfileWrapper)`
  text-align: start;
  margin-top: 3rem;
  padding: 0.3rem;
`;

export default MyLikesList;
