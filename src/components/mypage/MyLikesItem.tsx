import { useState } from 'react';
import { isBrowser } from 'react-device-detect';
import styled from 'styled-components';
import { LookProp } from '../look/LookItem';
import LookDetailModal from '../modal/LookDetailModal';

const MyLikesItem = ({ post }: LookProp) => {
  const [onModal, setOnModal] = useState(false);
  const { imagepath, post_id, style, temperature } = post;

  const handleModal = () => {
    if (isBrowser) {
      return setOnModal(true);
    }
  };
  console.log(onModal);

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
  width: 15rem;
  height: 15rem;
  margin: 0.6rem;
  cursor: pointer;
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
