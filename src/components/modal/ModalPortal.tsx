import ReactDOM from 'react-dom';
import { TModalProps } from '../../types/TModalProps';

const ModalPortal = ({ children }: TModalProps) => {
  const el = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
