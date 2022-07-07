import { useState, useEffect } from 'react';
import '../styles/NavBar.css';
import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authState';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import '../styles/Modal.css';
import { modalState } from '../recoil/modalState';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function NavBar() {
  const [isNavOn, setIsNavOn] = useState(false);
  const [isModalOn, setIsModalOn] = useRecoilState(modalState);
  const authedUser = useRecoilValue(authState);
  const handleModal = useSetRecoilState(modalState);

  const handleNav = () => {
    if (window.scrollY > 500) {
      setIsNavOn(true);
    } else if (window.scrollY < 200) {
      setIsNavOn(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/liked') {
      setIsNavOn(true);
    }

    if (window.location.pathname === '/') {
      window.addEventListener('scroll', handleNav);
      return () => {
        window.removeEventListener('scroll', handleNav);
      };
    }
  }, []);

  const logout = () => {
    signOut(auth).then(() => alert('logout!'));
    localStorage.removeItem('recoil-persist');

    handleModal((prev) => !prev);
    window.location.href = 'https://what-s-my-look.web.app/';
    document.body.style.overflow = 'unset';
  };

  const liked = () => {
    window.location.href = 'https://what-s-my-look.web.app/liked';
  };

  const modalHandler = () => {
    setIsModalOn((prev) => !prev);
  };

  const isUserAuthed = () => {
    if (!authedUser) {
      alert('로그인 후 이용해주세요.');
    }
  };

  return (
    <header>
      <div className={isNavOn ? 'nav-actived' : 'none'}>
        <div className='nav-title'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
        </div>

        <div className='nav-content'>
          {window.location.pathname === '/liked' ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <>
              {authedUser ? (
                <>
                  <button onClick={logout}>Logout</button>
                  <button onClick={liked}>Liked</button>
                </>
              ) : (
                <>
                  <button onClick={modalHandler}>Login</button>
                  <button onClick={isUserAuthed}>Liked</button>
                  <ModalPortal>{isModalOn && <Modal />}</ModalPortal>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
