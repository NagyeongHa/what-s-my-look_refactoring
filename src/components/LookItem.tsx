import React from 'react';
import styled from 'styled-components';
import { ILook } from '../types/ILookProperty';

interface LookProp {
  post: ILook;
}

const LookItem = ({ post }: LookProp) => {
  const { imagepath, content, sns_id } = post;

  return (
    <>
      <Img src={imagepath} alt='' />
      {/* <Like /> */}
      {sns_id}
      {content}
    </>
  );
};

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  margin: 3.3rem 0 0.5rem 0;

  &:first-child {
    margin-top: 0.5rem;
  }
`;
export default LookItem;
