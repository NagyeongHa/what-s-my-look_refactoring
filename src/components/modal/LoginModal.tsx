import React from 'react';
import styled from 'styled-components';
import { TModalProps } from '../../types/TModalProps';
import ModalLayout from './ModalLayout';
import kakaoLogo from '../../assets/icon/kakao_login.png';
import theme from '../../styles/theme';

const LoginModal = ({ setOnModal }: TModalProps) => {
  return (
    <ModalLayout setOnModal={setOnModal}>
      <ModalWrapper>
        <p>카카오톡으로 간편 로그인 / 회원가입 하기</p>
        <a href='https://port-0-what-s-my-look-backend-3vw25lciqujim.gksl2.cloudtype.app/oauth/kakao'>
          <SnsButtonImg src={kakaoLogo} alt='KaKaoLogin' />
        </a>
        {/* <a href='https://port-0-what-s-my-look-backend-3vw25lciqujim.gksl2.cloudtype.app/oauth/google'>
          <SnsButtonImg src={googleLogo} alt='googleLogin' />
        </a>
        <a href='https://port-0-what-s-my-look-backend-3vw25lciqujim.gksl2.cloudtype.app/oauth/naver'>
          <SnsButtonImg src={naverLogo} alt='NaverLogin' />
        </a> */}
      </ModalWrapper>
    </ModalLayout>
  );
};
const ModalWrapper = styled.div`
  width: 85vw;
  padding-top: 2rem;
  padding-bottom: 1rem;
  text-align: center;
  font-family: ${theme.font.thin};

  @media ${theme.device.desktop} {
    width: 30vw;
  }

  p {
    margin: 0.6rem auto;
    color: black;
    font-size: 0.9rem;
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
