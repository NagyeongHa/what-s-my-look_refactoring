import { atom } from 'recoil';

export const authedUserState = atom<User>({
  key: 'authedUserState',
  default: { sns_id: '', name: '', profileimage: '', type: '' },
});

interface User {
  sns_id: string | number;
  name: string;
  profileimage: string;
  type: string;
}
