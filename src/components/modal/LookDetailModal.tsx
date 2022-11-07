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

  useEffect(() => {
    defaultApi
      .get(`/post/${post_id}`)
      .then((res) => setLookData(res.data))
      .catch((err) => console.log(err));
  }, [post_id]);
  console.log(lookData);

  return (
    <>
      <ModalLayout setOnModal={setOnModal}>
        {lookData.map((item) => (
          <ModalWrapper key={post_id}>
            <>
              <img src={item.imagepath} alt='' />
            </>
            <Content>
              <span>
                {item.temperature} {item.style}
              </span>
              <span>{item.sns_id}</span>
              <span>{item.content}</span>
              <span>{item.moddate}</span>
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
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
export default LookDetailModal;
