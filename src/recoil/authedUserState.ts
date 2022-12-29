import { atom } from 'recoil';

export const authedUserState = atom<User>({
  key: 'authedUserState',
  default: {
    sns_id: '',
    name: '',
    profileimage: '',
    type: '',
    authenticated: false,
  },
});

interface User {
  sns_id: string;
  name: string;
  profileimage: string;
  type: string;
  authenticated: boolean;
}
