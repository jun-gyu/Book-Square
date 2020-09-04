import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  background-color: #65dffb;
  color: #fff;
  padding: 10px 40px;
  color: #fff;
  font-size: 18px;
  border-radius: 25px;
  border: none;
  outline: none;
  margin: 30px auto 0;
  display: block;
  cursor: pointer;
`;

const Button = ({ text }) => (
  <ButtonStyled>{text}</ButtonStyled>
);

export default Button;
