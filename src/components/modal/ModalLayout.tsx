import ModalPortal from './ModalPortal';
import styled from 'styled-components';
import { TModalProps } from '../../types/TModalProps';
import { GoX } from 'react-icons/go';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { LoginModalState } from '../../recoil/LoginModalState';

const ModalLayout = ({ children, setOnModal }: TModalProps) => {
  // const LoginSetOnModal = useSetRecoilState(LoginModalState);
  const modalRef = useRef(null);
  const handleClose = () => {
    setOnModal(false);
  };

  //모달창 바깥 클릭시 모달 창 닫기
  useEffect(() => {
    const handleOutsideClick = (
      event: React.BaseSyntheticEvent | MouseEvent
    ) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOnModal(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [modalRef, setOnModal]);

  //모달창 바깥 스크롤 막기
  useEffect(() => {
    const $html = document.querySelector('html');
    $html.style.overflow = 'hidden';

    return () => {
      $html.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalPortal>
      <OverLay>
        <ModalTheme ref={modalRef}>
          <button onClick={handleClose}>
            <GoX size='1.3rem' color='white' />
          </button>
          {children}
        </ModalTheme>
      </OverLay>
    </ModalPortal>
  );
};

const OverLay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ModalTheme = styled.div`
  position: fixed;
  border-radius: 0.7rem;
  width: auto;
  height: auto;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 25px 13px;

  & > button:first-child {
    position: absolute;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

export default ModalLayout;
