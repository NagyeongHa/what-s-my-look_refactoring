import React, { useEffect } from 'react';
import { ILook } from '../types/ILookProperty';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import styled from 'styled-components';
import { ILike } from '../types/ILikeProperty';
import theme from '../styles/theme';
import { useRecoilValue } from 'recoil';
import { authedUserState } from '../recoil/authedUserState';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUserAlreadyLiked, unLike, upLike } from '../service/api';

const Like = ({ post_id }: Pick<ILook, 'post_id'>) => {
  const queryClient = useQueryClient();
  const { sns_id } = useRecoilValue(authedUserState);

  const { data: likes } = useQuery<ILike>({
    queryKey: ['getUserAlreadyLiked', post_id, sns_id],
    queryFn: () => getUserAlreadyLiked(post_id, sns_id),
  });

  const upLikeMutation = useMutation({
    mutationFn: upLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries('getUserAlreadyLiked');
      console.log(data);
    },
  });

  const upLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    upLikeMutation.mutate({ post_id, sns_id });
  };

  useEffect(() => {
    if (upLikeMutation.data?.message === 'sns_id is not valid') {
      alert('로그인 후 이용가능합니다.');
    }
  }, [upLikeMutation.data]);

  const unLikeMutation = useMutation({
    mutationFn: unLike,
    onSuccess: () => queryClient.invalidateQueries('getUserAlreadyLiked'),
  });

  const unLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    unLikeMutation.mutate({ post_id, sns_id });
  };

  return (
    <LikeWrapper>
      {likes && likes.alreadyLiked ? (
        <Button onClick={unLikeHandler}>
          <BsFillHeartFill
            className='like-icon'
            color='#f10b0b'
            size='1.3rem'
          />
        </Button>
      ) : (
        <Button onClick={upLikeHandler}>
          <BsHeart size='1.3rem' color='black' />
        </Button>
      )}
      <span>좋아요{likes && likes.total}개</span>
    </LikeWrapper>
  );
};
const LikeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
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
