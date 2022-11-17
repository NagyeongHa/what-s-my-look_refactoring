import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import { TModalProps } from '../../types/TModalProps';
import { defaultApi } from '../../utils/apiInstance';
import Like from '../Like';
import ModalLayout from './ModalLayout';

interface LookDetailModalProp extends TModalProps {
  post_id: number;
}

const LookDetailModal = ({ setOnModal, post_id }: LookDetailModalProp) => {
  const [lookData, setLookData] = useState<ILook[]>([]);
  const [date, setDate] = useState('');
  const sliceDate = date.substring(0, 10);

  useEffect(() => {
    defaultApi
      .get(`/post/${post_id}`)
      .then((res) => {
        setLookData(res.data);
        setDate(res.data[0].moddate);
      })
      .catch((err) => console.log(err));
  }, [post_id]);

  return (
    <ModalLayout setOnModal={setOnModal}>
      {lookData.map((item) => (
        <ModalWrapper key={post_id}>
          <img src={item.imagepath} alt='' />
          <Content>
            <div>
              <img src={item.profileimage} alt='' />
              <b>{item.sns_id}</b>
            </div>
            <hr />
            <Like post_id={post_id} />
            <div>{item.content}</div>
            <div>{sliceDate}</div>
            <StyleTag>
              <span>{item.temperature}℃</span>
              <span>{item.style}</span>
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
