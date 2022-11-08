import { ReactNode } from 'react';
export type TModalProps = {
  children?: ReactNode;
  setOnModal?: (state: boolean) => void;
};
