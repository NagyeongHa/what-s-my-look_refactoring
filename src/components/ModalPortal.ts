import ReactDOM from 'react-dom';
import { IModalProps } from '../types/IModalProps';

const ModalPortal = ({ children }: IModalProps) => {
  const el = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
