import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authState';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import '../styles/Modal.css';
import { modalState } from '../recoil/modalState';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import styled from 'styled-components';

const Header = () => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const authedUser = useRecoilValue(authState);
  const handleModal = useSetRecoilState(modalState);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => alert('logout!'));
    localStorage.removeItem('recoil-persist');
    handleModal((prev) => !prev);
    window.location.reload();
  };

  const toLiked = () => {
    navigate('/liked');
  };

  const modal = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <>
      <HeaderTheme>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>

        <CustomButtonGroup>
          {authedUser ? (
            <>
              <CustomButton onClick={logout}>Logout</CustomButton>
              <CustomButton onClick={toLiked}>My</CustomButton>
            </>
          ) : (
            <>
              <CustomButton onClick={modal}>Login</CustomButton>
              <ModalPortal>{isModal && <Modal />}</ModalPortal>
            </>
          )}
        </CustomButtonGroup>
      </HeaderTheme>
    </>
  );
};

const HeaderTheme = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 3.2rem;
  top: 0;
  left: 0;
  background-color: #fff;
  font-size: 2rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  z-index: 99;

  img {
    padding-right: 12rem;
    width: 20rem;
    height: 3.2rem;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const CustomButton = styled.button`
  background-color: #fff;
  color: black;
  margin-right: 0.4rem;
`;

export const CustomButtonGroup = styled.div`
  padding-top: 10px;
  width: 12rem;
  height: 4rem;
`;

export default Header;
