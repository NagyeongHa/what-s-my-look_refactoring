import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import '../styles/Modal.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './modal/LoginModal';
import { LoginModalState } from '../recoil/LoginModalState';
import { authedUserState } from '../recoil/authedUserState';
import { logout } from '../service/api';

const Header = () => {
  const [onModal, setOnModal] = useRecoilState(LoginModalState);
  const { name, authenticated } = useRecoilValue(authedUserState);
  const resetUserInfo = useResetRecoilState(authedUserState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    resetUserInfo();
  };

  const toLiked = () => {
    if (authenticated) {
      return navigate('/my');
    }
    return alert('로그인 후 이용가능합니다.');
  };

  const handleModal = () => {
    setOnModal(true);
  };

  const handleOnModalProp = (bool: boolean) => {
    setOnModal(bool);
  };

  return (
    <HeaderTheme>
      <Link to='/'>
        <img src={logo} alt='' />
      </Link>

      <CustomButtonGroup>
        {authenticated ? (
          <>
            {name}
            <CustomButton onClick={handleLogout}>Logout</CustomButton>
            <CustomButton onClick={toLiked}>My</CustomButton>
          </>
        ) : (
          <>
            <CustomButton onClick={handleModal}>Login</CustomButton>
            <CustomButton onClick={toLiked}>My page</CustomButton>
            {onModal && <LoginModal setOnModal={handleOnModalProp} />}
          </>
        )}
      </CustomButtonGroup>
    </HeaderTheme>
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
  /* box-shadow: rgb(0 0 0 / 12%) 0px 31px 36px -15px; */
  border-bottom: 1px solid #e3e2e2;
  z-index: 99;

  img {
    padding-right: 12rem;
    width: 20rem;
    height: 3.2rem;
    padding-top: 11px;
    padding-bottom: 5px;
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
