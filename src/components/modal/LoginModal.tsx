import React from 'react';
import { TModalProps } from '../../types/TModalProps';
import ModalLayout from './ModalLayout';

const LoginModal = ({ setOnModal }: TModalProps) => {
  return <ModalLayout setOnModal={setOnModal}>로그인 모달입니다</ModalLayout>;
};

export default LoginModal;
