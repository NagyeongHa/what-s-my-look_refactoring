import { useState } from 'react';
import { isBrowser } from 'react-device-detect';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Like from '../Like';
import { Content, LookImg, LookProp } from '../look/LookItem';
import LookDetailModal from '../modal/LookDetailModal';

const MyLikesItem = ({ post }: LookProp) => {
  const [onModal, setOnModal] = useState(false);
  const {
    profileimage,
    imagepath,
    post_id,
    sns_id,
    style,
    temperature,
    content,
  } = post;

  const handleModal = () => {
    if (isBrowser) {
      return setOnModal(true);
    }
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

      {/* {isBrowser ? (
        <>
          <Img src={imagepath} />
          <ImgInfo>
            {temperature}℃ / {style}
          </ImgInfo>
        </>
      ) : (
        <>
          <LookImg src={imagepath} alt='' />
          <Like post_id={post_id} />
          <Content>
            <span>
              <img src={profileimage} alt='' />
            </span>
            <span>{sns_id}</span>
            {content}
          </Content>
        </>
      )} */}

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
