import ModalPortal from './ModalPortal';
import styled from 'styled-components';
import { TModalProps } from '../../types/TModalProps';
import { GoX } from 'react-icons/go';

const ModalLayout = ({ children, setOnModal }: TModalProps) => {
  const handleModal = () => {
    setOnModal(false);
  };

  //modal ? 스크롤 막기 : 스크롤 풀기 기능 추가

  return (
    <ModalPortal>
      <OverLay onClick={handleModal}>
        <ModalTheme>
          <button onClick={handleModal}>
            <GoX size='1.3rem' color='gray' />
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
  z-index: 999;
  width: auto;
  height: auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 25px 13px;

  button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
  }
`;

export default ModalLayout;
