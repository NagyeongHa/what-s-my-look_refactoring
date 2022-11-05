import React from 'react';
import styled from 'styled-components';

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
  margin: 2rem auto;
  text-align: center;
`;
const StyleButton = styled.button`
  padding: 0.3rem 0.6rem;
  margin: 0.4rem 0.4rem;
  background-color: white;
  border: 1px solid gray;
  border-radius: 30px;
  box-shadow: 5px 5px 9px -5px #bcbcbc;
  font-size: 0.7rem;

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
