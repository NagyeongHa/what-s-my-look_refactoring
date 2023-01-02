import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import Like from '../Like';
import LookDetailModal from '../modal/LookDetailModal';

export interface LookProp {
  post: ILook;
}

const LookItem = ({ post }: LookProp) => {
  const [onModal, setOnModal] = useState(false);
  const { imagepath, content, sns_id, post_id, profileimage } = post;
  console.log(post);

  const handleModal = () => {
    if (isMobile) {
      return setOnModal(false);
    }
    return setOnModal(true);
  };

  const handleOnModalProp = (bool: boolean) => {
    setOnModal(bool);
  };

  return (
    <>
      <div onClick={handleModal}>
        <LookImg src={imagepath} alt='' />
        <Like post_id={post_id} />
        <Content>
          <span>
            <img src={profileimage} alt='' />
          </span>
          <span>{sns_id}</span>
          {content}
        </Content>
      </div>
      {onModal && (
        <LookDetailModal setOnModal={handleOnModalProp} post_id={post_id} />
      )}
    </>
  );
};

export const LookImg = styled.img`
  object-fit: cover;
  width: 100%;
  margin: 0.4rem 0;

  @media ${theme.device.desktop} {
    height: 30rem;
    object-fit: cover;
    border-radius: 0.2rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.03);
      -webkit-transform: scale(1.03);
      -moz-transform: scale(1.03);
      -ms-transform: scale(1.03);
      -o-transform: scale(1.03);
    }
  }
`;

export const Content = styled.div`
  overflow: hidden;
  white-space: normal;
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
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
export default LookItem;
