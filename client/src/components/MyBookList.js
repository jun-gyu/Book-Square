import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import { Link } from "react-router-dom";

const BookListWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  margin: 0 30px 30px;
  text-align: center;
  display: inline-block;
  & > * {
    display: block;
  }
  & > img {
    height: 160px;
    margin: 0 auto 8%;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.28);
    border-radius: 10px;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    &::after,
    & > span::after,
    & > span::before {
      content: "";
      position: absolute;
      width: 4px;
      height: 4px;
      background: #111;
      border-radius: 50%;
    }
    &::after {
      top: 0;
    }
    & > span {
      width: 100%;
      height: 100%;
      &:after {
        top: 24%;
      }
      &::before {
        top: 50%;
      }
    }

    &.openViewMore {
      &::after,
      & > span::after {
        z-index: 1;
        top: 50%;
        left: 20%;
        width: 50%;
        height: 2px;
        background: #111;
        border-radius: 0;
      }
      &::after {
        transform: rotate(-45deg);
      }
      & > span {
        width: 100%;
        height: 100%;
        &:after {
          transform: rotate(45deg);
        }
      }
    }
  }
  & > .closeList {
    height: 0;
    font-size: 0;
  }
  & > .openList {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 80%;
    height: 50%;
    background: #ffeded;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 15px 15px 27px 2px rgba(128, 128, 128, 1);
    transition: all 0.7s ease-in-out;
    font-size: 18px;
    font-weight: 700;
    & > * {
      color: #4f527d;
      display: block;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
`;


const MyBookList = ({ myLibrary, writeReportHandler, deleteBookHandler }) => {

  const [clickedViewMore , setClickViewMore] = useState(false);

  return (
    <BookListWrapper>
      <img src={myLibrary.bookImage} alt="책 미리보기 이미지" />
      <strong className="title_myBook">{myLibrary.bookTitle}</strong>
      <span className="authors_myBook">{myLibrary.bookAuthor}</span>
      <span className="rate_myBook">
        <Rate disabled defaultValue={myLibrary.bookRate} />
      </span>
      <button className={clickedViewMore ? "openViewMore" : "closeViewMore"} onClick={() => setClickViewMore(clickedViewMore ? false : true)}>
        <span className="moreBtnDotIcon"></span>
      </button>
      <div className={clickedViewMore ? "openList" : "closeList"}>
        <Link to="/WriteReport" onClick={() => writeReportHandler(myLibrary)}>독후감 작성하기</Link>
        <span onClick={() => { deleteBookHandler(myLibrary); setClickViewMore(false)}}>책 제거</span>
      </div>
    </BookListWrapper>
  );
};

export default MyBookList;
