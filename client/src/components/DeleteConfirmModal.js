import React from 'react';
import styled from 'styled-components';
import { BsTrash } from 'react-icons/bs';

const DeleteConfirmModalWrapper = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background: #ffffff;
  padding: 25px 35px;
  width: 400px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 0 60px -15px black;
  font-size: 18px;
  text-align: center;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: #e2525c;
  }
  & > svg {
    width: 20%;
    height: 20%;
    fill: #111;
    margin: 50px auto 25px;
  }
  & > span {
    display: block;
    color: #e91e63;
    font-weight: 600;
    font-size: 20px;
  }

  & > .consent,
  & > .reject {
    display: inline-block;
    background: #fff;
    border: none;
    border-radius: 8px;
    width: 40%;
    height: 35px;
    outline: none;
    color: #111;
    font-size: 18px;
    margin: 8% 3% 0;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      transition: all 0.5s ease-in-out;
      color: #fff;
      background: #e91e63;
    }
  }
`;

const DeleteConfirmModal = ({ deleteBookHandler }) => {
  console.log(deleteBookHandler)
  return (
    <DeleteConfirmModalWrapper>
      <BsTrash />
      <span>책을 삭제하시겠습니까?</span>
      <button className="consent" onClick={() => deleteBookHandler(true)}>
        확인
      </button>
      <button className="reject" onClick={() => deleteBookHandler(false)}>
        취소
      </button>
    </DeleteConfirmModalWrapper>
  );
};

export default DeleteConfirmModal;