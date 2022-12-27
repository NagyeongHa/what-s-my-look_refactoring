import React from 'react';
import styled from 'styled-components';
import { TModalProps } from '../../types/TModalProps';
import ModalLayout from './ModalLayout';
import kakaoLogo from '../../assets/icon/kakao_login.png';
import googleLogo from '../../assets/icon/google_login.png';
import naverLogo from '../../assets/icon/naver_login.png';

const LoginModal = ({ setOnModal }: TModalProps) => {
  return (
    <ModalLayout setOnModal={setOnModal}>
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
    </ModalLayout>
  );
};
const SnsButtonImg = styled.img`
  margin: 0.8rem auto;
`;

export default LoginModal;
