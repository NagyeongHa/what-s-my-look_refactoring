import { useNavigate } from 'react-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { authedUserState } from '../../recoil/authedUserState';
import { logout } from '../../service/api';
import theme from '../../styles/theme';
import { AiFillCaretRight } from 'react-icons/ai';

const Profile = () => {
  const { name, profileimage } = useRecoilValue(authedUserState);
  const resetUserInfo = useResetRecoilState(authedUserState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    await resetUserInfo();

    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <ProfileWrapper>
      <Img src={profileimage} alt='' />
      <p>
        <b>{name}</b>님 반갑습니다
      </p>
      {/* <button>회원정보수정</button> */}
      <Logout>
        <button onClick={handleLogout}>로그아웃</button>
        <i>
          <AiFillCaretRight color='gray' />
        </i>
      </Logout>
    </ProfileWrapper>
  );
};

export const ProfileWrapper = styled.div`
  /* background-color: pink; */
  border: 1px solid lightgray;
  border-radius: 0.7rem;
  height: auto;
  margin: 6rem auto 1rem auto;
  text-align: center;
  padding: 1.7rem;
  width: 95vw;
  font-family: ${theme.font.thin};

  @media ${theme.device.desktop} {
    width: 70vw;
    padding: 2rem;
  }

  p {
    margin-top: 0.5rem;
  }
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.4rem;

  button {
    border: none;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-family: ${theme.font.thin};
  }

  i {
    margin-top: 0.3rem;
  }
`;
export const Img = styled.img`
  width: 3rem;
  border-radius: 50%;
`;

export default Profile;
