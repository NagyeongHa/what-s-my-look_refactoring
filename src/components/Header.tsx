import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import '../styles/Modal.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './modal/LoginModal';
import { LoginModalState } from '../recoil/LoginModalState';
import { authedUserState } from '../recoil/authedUserState';
import theme from '../styles/theme';

const Header = () => {
  const [onModal, setOnModal] = useRecoilState(LoginModalState);
  const { name, authenticated, profileimage } = useRecoilValue(authedUserState);
  const navigate = useNavigate();

  const toLiked = () => {
    if (authenticated) {
      return navigate('/my');
    }
    alert('로그인 후 이용가능합니다.');
    setOnModal(true);
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
            <img src={profileimage} alt='' />
            <span>{name}님</span>
            {/* <CustomButton onClick={handleLogout}>Logout</CustomButton> */}
            <CustomButton onClick={toLiked}>My</CustomButton>
          </>
        ) : (
          <>
            <CustomButton onClick={handleModal}>Login</CustomButton>
            <CustomButton onClick={toLiked}>My</CustomButton>
            {onModal && <LoginModal setOnModal={handleOnModalProp} />}
          </>
        )}
      </CustomButtonGroup>
    </HeaderTheme>
  );
};

const HeaderTheme = styled.header`
  display: flex;
  flex-wrap: nowrap;
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

  & > a > img {
    height: 3.2rem;
    padding: 15px;
    padding-bottom: 5px;
  }
`;

export const CustomButton = styled.button`
  background-color: #fff;
  color: black;
  margin-right: 1rem;
  border: none;
  font-size: 1.1rem;
  font-family: ${theme.font.thin};
`;

export const CustomButtonGroup = styled.div`
  padding-top: 5px;
  width: auto;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.font.thin};

  span {
    font-size: 1.1rem;
    margin-right: 0.6rem;
    color: black;
  }

  img {
    border-radius: 50%;
    padding: 0.3rem;
    width: 2.3rem;
    height: auto;
    margin-right: 0.3rem;
  }
`;

export default Header;
