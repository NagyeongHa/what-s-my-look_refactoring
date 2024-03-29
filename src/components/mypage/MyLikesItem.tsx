import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { LookProp } from '../look/LookItem';
import LookDetailModal from '../modal/LookDetailModal';

const MyLikesItem = ({ post }: LookProp) => {
  const [onModal, setOnModal] = useState(false);
  const {
    // profileimage,
    imagepath,
    post_id,
    // sns_id,
    style,
    temperature,
    // content,
  } = post;

  const handleModal = () => {
    setOnModal(true);
  };

  const handleOnModalProp = (bool: boolean) => {
    setOnModal(bool);
  };

  return (
    <LikeItemWrapper onClick={handleModal}>
      <Img src={imagepath} />
      <ImgInfo>
        {temperature}℃ / {style}
      </ImgInfo>

      {onModal && (
        <LookDetailModal setOnModal={handleOnModalProp} post_id={post_id} />
      )}
    </LikeItemWrapper>
  );
};

const LikeItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0.29rem;
  flex: 1 1 30%;
  height: 24vh;
  /* width: 13rem; */

  /* &:nth-last-child(-n + 3) {
    flex: 0 1 31%;
  } */

  @media ${theme.device.desktop} {
    margin: 0.6rem;
    flex: auto;
    width: 15rem;
    height: 24rem;
  }
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const ImgInfo = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 1.2rem;
  &:hover {
    opacity: 1;
  }
`;

export default MyLikesItem;
