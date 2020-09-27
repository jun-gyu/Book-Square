import React from "react";
import styled from "styled-components";
import { Rate } from "antd";

const ClickModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 50%;
  height: 80%;
  transform: translate(-50%, -50%);
  background: #faffff;
  border-radius: 20px;
  padding: 5%;
  & > * {
    display: block;
    font-size: 17px;
    text-align: center;
  }
  & > img {
    margin: 0 auto;
    width: 200px;
    height: auto;
  }
  & > strong {
    margin-top: 20px;
  }
  & > .bookAuthor {
    font-size: 14px;
    color: #777;
  }
  & > .bookRate {
    font-weight: 700;
    margin: 60px 0 20px 0;
    font-size: 20px;
    color: #636363;
  }
  ul > li > div > div > span {
    width: 30px;
    height: 30px;
  }
  ul > li > div > div > span > svg {
    width: 100%;
    height: 100%;
  }
  & > div {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    & > button {
      border: none;
      background: #c2feff;
      border-radius: 10px;
      font-size: 17px;
      font-weight: 600;
      width: 150px;
      height: 50px;
      color: #777;
      cursor: pointer;
      margin: 0 50px;
    }
  }
`;

const ClickModal = ({ modalClose, bookRateSave, clickBookInfoModal }) => {
  const handleChange = (value) => {
    bookRateSave(value);
  };

  return (
    <ClickModalWrapper>
      <img src={clickBookInfoModal.bookImage} />
      <strong>{clickBookInfoModal.bookTitle}</strong>
      <span className="bookAuthor">{clickBookInfoModal.bookAuthor}</span>
      <span className="bookRate">평점 남기기</span>
      <Rate onChange={handleChange} />
      <div>
        <button onClick={() => modalClose()}>취소</button>
        <button onClick={() => modalClose()}>저장</button>
      </div>
    </ClickModalWrapper>
  );
};

export default ClickModal;
