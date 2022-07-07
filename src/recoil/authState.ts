import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom<null>({
  key: 'authState',
  default: null,
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedInState',
  default: false,
});
