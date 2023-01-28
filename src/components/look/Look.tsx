import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { weatherState } from '../../recoil/weatherState';
import theme from '../../styles/theme';
import { ILook } from '../../types/ILookProperty';
import LookItem from './LookItem';
import StyleFilter from './StyleFilter';
import { RiTShirtAirLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { getLooks } from '../../service/api';

const Look = () => {
  const [style, setStyle] = useState('');
  const defaultTemperature = useRecoilValue(weatherState);
  const temperature = Math.round(defaultTemperature.temp);

  const { data } = useQuery<ILook[]>({
    queryKey: ['getLooks', temperature, style],
    queryFn: () => getLooks(temperature, style),
  });

  const selectStyle = (styleState: string) => {
    setStyle(styleState);
  };

  return (
    <>
      <StyleFilter selectStyleHandler={selectStyle} />
      {data?.length ? (
        <LookContainer>
          {data.map((item) => (
            <LookCard key={item.post_id}>
              <LookItem post={item} />
            </LookCard>
          ))}
        </LookContainer>
      ) : (
        <EmptyContents>
          <RiTShirtAirLine size='4rem' color='#b1b1b1' />
          준비중 입니다.
        </EmptyContents>
      )}
    </>
  );
};

const LookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${theme.device.desktop} {
    flex-flow: row wrap;
    align-items: center;
    justify-content: start;
    width: 1500px;
    text-align: center;
    margin: 0 auto;
  }
`;

const LookCard = styled.div`
  margin: 0.8rem 0;

  &:first-child {
    margin-top: 0rem;
  }

  @media ${theme.device.desktop} {
    width: 24rem;
    padding: 1.3rem 1.8rem;
    margin: 0 0.5rem;
  }
`;

const EmptyContents = styled.div`
  font-family: ${theme.font.thin};
  margin: 9rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default Look;
