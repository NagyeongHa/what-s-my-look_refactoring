import ModalPortal from './ModalPortal';
import Login from './Login';
import { modalState } from '../recoil/modalState';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Modal = () => {
  const modal = useSetRecoilState(modalState);

  const handleModal = () => {
    modal((prev) => !prev);
  };

  return (
    <OverLay>
      <ModalPortal>
        <ModalTheme>
          <Login />
          <p>좋아요한것들을 모아보고 싶다면?</p>
          <CloseButton onClick={handleModal}>다음에 할게요</CloseButton>
        </ModalTheme>
      </ModalPortal>
    </OverLay>
  );
};

const OverLay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ModalTheme = styled.div`
  position: fixed;
  top: 14.8rem;
  left: 2rem;
  border-radius: 1rem;
  z-index: 11;
  width: 20rem;
  height: 10rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;

  p {
    font-family: 'Gowun Dodum', sans-serif;
    display: block;
    text-align: center;
    margin-top: 0.4rem;
  }
`;

const CloseButton = styled.button`
  font-family: 'Gowun Dodum', sans-serif;
  position: fixed;
  border-radius: 4px;
  background-color: cadetblue;
  color: #fff;
  text-align: center;
  top: 22rem;
  left: 9rem;
`;

export default Modal;
