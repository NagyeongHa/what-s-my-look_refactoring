import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: 'authState',
  default: {},
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const isLoggedInState = {
  key: 'isLoggedInState',
  default: false,
};
