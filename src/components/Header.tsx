import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import '../styles/Modal.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import styled from 'styled-components';
import LoginModal from './modal/LoginModal';
import { LoginModalState } from '../recoil/LoginModalState';
import { authedUserState } from '../recoil/authedUserState';

const Header = () => {
  const [onModal, setOnModal] = useRecoilState(LoginModalState);
  const { name } = useRecoilValue(authedUserState);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => alert('logout!'));
    localStorage.removeItem('recoil-persist');
    window.location.reload();
  };

  const toLiked = () => {
    navigate('/my');
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
        {name ? (
          <>
            {name}
            <CustomButton onClick={logout}>Logout</CustomButton>
            <CustomButton onClick={toLiked}>My</CustomButton>
          </>
        ) : (
          <>
            <CustomButton onClick={handleModal}>Login</CustomButton>
            <CustomButton>
              <Link to='/my'>My page</Link>
            </CustomButton>
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
