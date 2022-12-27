import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { authedUserState } from '../../recoil/authedUserState';
import theme from '../../styles/theme';

const Profile = () => {
  const { name, profileimage } = useRecoilValue(authedUserState);

  return (
    <ProfileWrapper>
      <Img src={profileimage} alt='' />
      <p>
        <b>{name}</b>님 반갑습니다
      </p>
      <button>회원정보수정</button>
      <button>로그아웃</button>
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
  padding: 2rem;
  width: 95vw;

  @media ${theme.device.desktop} {
    width: 70vw;
  }
`;

export const Img = styled.img`
  width: 3rem;
  border-radius: 50%;
`;

export default Profile;
