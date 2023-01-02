import React from 'react';
import styled from 'styled-components';
import { TModalProps } from '../../types/TModalProps';
import ModalLayout from './ModalLayout';
import kakaoLogo from '../../assets/icon/kakao_login.png';
import googleLogo from '../../assets/icon/google_login.png';
import naverLogo from '../../assets/icon/naver_login.png';
import theme from '../../styles/theme';

const LoginModal = ({ setOnModal }: TModalProps) => {
  return (
    <ModalLayout setOnModal={setOnModal}>
      <ModalWrapper>
        {/* <a href='http://localhost:8080/oauth/kakao'> */}
        <a href='https://whatsmylookbackend.duckdns.org/oauth/kakao'>
          <SnsButtonImg src={kakaoLogo} alt='KaKaoLogin' />
        </a>
        <a href='https://whatsmylookbackend.duckdns.org/oauth/google'>
          <SnsButtonImg src={googleLogo} alt='googleLogin' />
        </a>
        <a href='https://whatsmylookbackend.duckdns.org/oauth/naver'>
          <SnsButtonImg src={naverLogo} alt='NaverLogin' />
        </a>
      </ModalWrapper>
    </ModalLayout>
  );
};
const ModalWrapper = styled.div`
  width: 85vw;
  padding-top: 2rem;
  padding-bottom: 1rem;
  text-align: center;

  @media ${theme.device.desktop} {
    width: 30vw;
  }
`;

const SnsButtonImg = styled.img`
  margin: 0.6rem auto;
  width: 70vw;
  text-align: center;

  @media ${theme.device.desktop} {
    width: 17vw;
  }
`;

export default LoginModal;
