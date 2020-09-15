import React from 'react';
import styled from 'styled-components';
import { FaRegSadTear } from 'react-icons/fa';

const DeleteConfirmModalWrapper = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background: #ffe8f6;
  padding: 25px 35px;
  width: 400px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 0 60px -15px black;
  font-size: 18px;
  text-align: center;
  & > svg {
    width: 20%;
    height: 20%;
    fill: #e91e63
  }
  & > span {
    display: block;
    color: #e91e63;
    font-weight: 600;
    font-size: 20px;
    margin: 7% 0 17%;
  }

  & > .consent, & > .reject {
    display: block;
    background: #fff;
    border: none;
    border-radius: 8px;
    width: 70%;
    height: 35px;
    outline: none;
    color: #e91e63;
    font-size: 15px;
    margin: 8% auto 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all .5s ease-in-out;
    &:hover {
      transition: all .5s ease-in-out;
      color: #fff;
      background: #e91e63;
    }
  }
`;

const DeleteConfirmModal = ({ deleteBookHandler }) => {
  console.log(deleteBookHandler)
  return (
    <DeleteConfirmModalWrapper>
      <FaRegSadTear />
      <span>진짜 정말 지워요...?</span>
      <button className="consent" onClick={() => deleteBookHandler(true)}>
        지운다!
      </button>
      <button className="reject" onClick={() => deleteBookHandler(false)}>
        안 지운다!
      </button>
    </DeleteConfirmModalWrapper>
  );
};

export default DeleteConfirmModal;