import ModalPortal from './ModalPortal';
import '../styles/Modal.css';
import Login from './Login';
import { modalState } from '../recoil/modalState';
import { useSetRecoilState } from 'recoil';

const Modal = () => {
  const modal = useSetRecoilState(modalState);

  const handleModal = () => {
    modal((prev) => !prev);
  };

  return (
    <div className='overlay'>
      <ModalPortal>
        <div className='modal-content'>
          <Login />
          <p className='modal-about'>좋아요한것들을 모아보고 싶다면?</p>
          <button className='modal-close' onClick={handleModal}>
            다음에 할게요
          </button>
        </div>
      </ModalPortal>
    </div>
  );
};

export default Modal;
