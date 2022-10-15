import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import google from '../assets/icon/google.png';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/authState';
import '../styles/Modal.css';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [authedUser, setAuthUser] = useRecoilState(authState);
  const navigate = useNavigate();

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      const user = {
        email: result.user.email,
        nickName: result.user.displayName,
        photo: result.user.photoURL,
      };

      setAuthUser(user);

      if (authedUser) {
        navigate('/');
      }
    });
  };

  return (
    <div>
      <button onClick={signUpWithGoogle}>
        <img src={google} alt='' className='login-button' />
      </button>
    </div>
  );
};

export default Login;
