import styled from 'styled-components';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import { TModalProps } from '../../types/TModalProps';
import Like from '../Like';
import ModalLayout from './ModalLayout';
import { useQuery } from 'react-query';
import { getLookDetail } from '../../service/api';

interface LookDetailModalProp extends TModalProps {
  post_id: number;
}

const LookDetailModal = ({ setOnModal, post_id }: LookDetailModalProp) => {
  const { data } = useQuery<ILook[]>({
    queryKey: ['getLooks', post_id],
    queryFn: () => getLookDetail(post_id),
  });
  console.log(post_id);

  const date = data?.map((post) => post.moddate.substring(0, 10));

  return (
    <ModalLayout setOnModal={setOnModal}>
      {data?.map((post) => (
        <ModalWrapper key={post_id}>
          <img src={post.imagepath} alt='' />
          <Content>
            <div>
              <img src={post.profileimage} alt='' />
              <b>{post.sns_id}</b>
            </div>
            <hr />
            <Like post_id={post_id} />
            <div>{post.content}</div>
            <div>{date}</div>
            <StyleTag>
              <span>{post.temperature}℃</span>
              <span>{post.style}</span>
            </StyleTag>
          </Content>
        </ModalWrapper>
      ))}
    </ModalLayout>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  font-family: ${theme.font.thin};
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  img {
    height: 40rem;
    border-radius: 0.7rem 0 0 0.7rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  width: 19rem;
  word-break: keep-all;

  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    padding: 0.3rem;
  }

  & > div:not(:nth-child(3n)) {
    margin: 0.6rem 1rem;
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    margin: 0.7rem;
  }

  & > div:nth-child(3) {
    margin: 1rem 1rem 0rem 0.7rem;
  }

  & > div:nth-child(4) {
    line-height: 1.6rem;
    font-size: 1rem;
    word-break: keep-all;
  }

  & > div:nth-child(5) {
    color: #a4a4a4;
    font-size: 0.8rem;
  }

  & > b {
    margin: 0.4rem 1rem;
    font-weight: bold;
  }
`;

const StyleTag = styled.div`
  margin: 0.7rem 0.8rem;

  span {
    background-color: white;
    color: gray;
    margin-right: 0.8rem;
    border: 1px solid gray;
    border-radius: 1.5rem;
    padding: 0.25rem 1rem;
    font-size: 0.9rem;
    cursor: default;
  }
`;
export default LookDetailModal;
