import logo from '../assets/icon/logo.svg';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import '../styles/Modal.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import styled from 'styled-components';
import LoginModal from './modal/LoginModal';
import { useState } from 'react';

const Header = () => {
  const [onModal, setOnModal] = useState(false);
  const authedUser = useRecoilValue(authState);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => alert('logout!'));
    localStorage.removeItem('recoil-persist');
    window.location.reload();
  };

  const toLiked = () => {
    navigate('/liked');
  };

  const handleModal = () => {
    setOnModal(true);
  };

  const handleOnModalProp = (bool: boolean) => {
    setOnModal(bool);
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
              <CustomButton onClick={handleModal}>Login</CustomButton>
              {onModal && <LoginModal setOnModal={handleOnModalProp} />}
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
  /* box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px; */
  box-shadow: rgb(0 0 0 / 20%) 0px 31px 36px -10px;
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
