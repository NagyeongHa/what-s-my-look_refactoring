import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import { TModalProps } from '../../types/TModalProps';
import { defaultApi } from '../../utils/apiInstance';
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
    <>
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
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                mollitia ab quos aperiam earum cupiditate ullam. Nam, recusandae
                dolorum earum natus numquam dolores et rem officia quibusdam
                eos. Reprehenderit, quibusdam!
              </span>
              <span>{sliceDate}</span>
              <div>
                <span>{item.temperature}℃</span>
                <span>{item.style}</span>
              </div>
            </Content>
          </ModalWrapper>
        ))}
      </ModalLayout>
      ;
    </>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  font-family: ${theme.font.thin};
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  img {
    height: 37rem;
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
  & > div {
    margin: 1rem;
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    margin: 0.7rem;
  }
  & > div:last-child > span {
    background-color: #979595;
    color: white;
    margin-right: 0.5rem;
    border-radius: 1.5rem;
    padding: 0.5rem 0.8rem;
  }

  & > span {
    margin: 1.3rem 1rem;
  }

  & > span:first-child {
    line-height: 1.4rem;
    color: red;
  }
  & > b {
    margin: 0.4rem 1rem;
    font-weight: bold;
  }
  & > span:last-child {
    color: gray;
  }
`;
export default LookDetailModal;
