import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

export interface StyleFilterProp {
  selectStyleHandler: (styleState: string) => void;
}
const StyleFilter = ({ selectStyleHandler }: StyleFilterProp) => {
  const style = ['casual', 'modern', 'street', 'romantic'];

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    selectStyleHandler((e.target as HTMLButtonElement).textContent);
  };

  return (
    <ButtonWrapper>
      {style.map((item) => (
        <StyleButton onClick={onClickHandler} key={item}>
          {item}
        </StyleButton>
      ))}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 1.7rem auto 1.1rem auto;
  text-align: center;

  @media ${theme.device.desktop} {
    margin: 3rem auto 1.7rem auto;
  }
`;

const StyleButton = styled.button`
  padding: 0.3rem 0.6rem;
  margin: 0.4rem 0.4rem;
  background-color: white;
  border: 1px solid gray;
  border-radius: 30px;
  box-shadow: 5px 5px 9px -5px #bcbcbc;
  font-size: 0.7rem;
  font-family: ${theme.font.bold};

  @media ${theme.device.desktop} {
    font-size: 1.3rem;
    margin: 0.8rem 1rem;
    padding: 0.6rem 2rem;
  }

  &:focus {
    background-color: gray;
    color: white;
  }

  &:focus:hover {
    background-color: gray;
    color: white;
  }

  &:hover {
    background-color: rgb(243, 243, 243);
  }
`;
export default StyleFilter;
