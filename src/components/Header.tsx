import { useState, useEffect } from 'react';

import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authState';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import '../styles/Modal.css';
import { modalState } from '../recoil/modalState';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import styled from 'styled-components';

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isModal, setIsModal] = useRecoilState(modalState);
  const authedUser = useRecoilValue(authState);
  const handleModal = useSetRecoilState(modalState);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = () => {
    if (window.scrollY > 500) {
      setIsScroll(true);
    } else if (window.scrollY < 200) {
      setIsScroll(false);
    }
  };
  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === '/liked') {
      setIsScroll(true);
    }

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleNav);
      return () => {
        window.removeEventListener('scroll', handleNav);
      };
    }
  }, [location.pathname]);

  const logout = () => {
    signOut(auth).then(() => alert('logout!'));
    localStorage.removeItem('recoil-persist');
    handleModal((prev) => !prev);
    navigate('/');
  };

  const toLiked = () => {
    navigate('/liked');
  };

  const modal = () => {
    setIsModal((prev) => !prev);
  };

  const isUserAuthed = () => {
    if (!authedUser) {
      alert('로그인 후 이용해주세요.');
      return;
    }
  };

  return (
    <>
      {isScroll ? (
        <HeaderTheme>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>

          {authedUser ? (
            <CustomButtonGroup>
              <CustomButton onClick={logout}>Logout</CustomButton>
              <CustomButton onClick={toLiked}>Liked</CustomButton>
            </CustomButtonGroup>
          ) : (
            <CustomButtonGroup>
              <CustomButton onClick={modal}>Login</CustomButton>
              <CustomButton onClick={isUserAuthed}>Liked</CustomButton>
              <ModalPortal>{isModal && <Modal />}</ModalPortal>
            </CustomButtonGroup>
          )}
        </HeaderTheme>
      ) : null}
    </>
  );
};

const HeaderTheme = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 3.8rem;
  top: 0;
  left: 0;
  background-color: #fff;
  font-size: 2rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  z-index: 99;

  img {
    position: relative;
    left: 40rem;
    width: 22rem;
    height: 3rem;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export const CustomButton = styled.button`
  background-color: #fff;
  color: black;
  margin-right: 0.4rem;
`;

export const CustomButtonGroup = styled.div`
  width: 12rem;
  height: 4rem;
`;

export default Header;
