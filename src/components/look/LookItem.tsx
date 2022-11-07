import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import Like from '../Like';
import LookDetailModal from '../modal/LookDetailModal';

interface LookProp {
  post: ILook;
}

const LookItem = ({ post }: LookProp) => {
  const [onModal, setOnModal] = useState(false);
  const { imagepath, content, sns_id, post_id } = post;

  const handleModal = () => {
    setOnModal(true);
  };

  const handleOnModalProp = (bool: boolean) => {
    setOnModal(bool);
  };

  return (
    <>
      <div onClick={handleModal}>
        <Img src={imagepath} alt='' />
        <Like post_id={post.post_id} />
        <Content>
          <span>{sns_id}</span>
          {content}어쩌고 저꺼고 어어어어라 두줄이 필요해 어쩌꼬 랄랄루랄어쩌고
          저꺼고 어어어어라 두줄이 필요해 어쩌꼬 랄랄루랄 호이호이 랄랄루랄
          호이호이
        </Content>
      </div>
      {onModal && (
        <LookDetailModal setOnModal={handleOnModalProp} post_id={post_id} />
      )}
    </>
  );
};

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  margin: 0.4rem 0;

  @media ${theme.device.desktop} {
    height: 30rem;
    object-fit: cover;
  }
`;

const Content = styled.div`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  padding: 0.3rem;
  padding-bottom: 0;
  margin-left: 0.4rem;
  line-height: 1.3rem;
  font-family: ${theme.font.thin};
  letter-spacing: 0.02em;

  & > span {
    font-weight: 600;
    margin-right: 0.3rem;
  }

  @media ${theme.device.desktop} {
    text-align: start;
    padding: 0.2rem;
    margin: 0;
    line-height: 1.6rem;
    word-break: break-all;
  }
`;
export default LookItem;
