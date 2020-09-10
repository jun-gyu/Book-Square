import React from "react";
import styled from "styled-components";
import { Rate } from "antd";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const BookListWrapper = styled.div`
  perspective: 1000px;
  border: 2px solid rgba(0, 0, 0, 0) !important;
  position: relative;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  width: calc(100% / 3);
  height: 50%;
  text-align: center;
  display: inline-block;
  .thumbnail_myBook {
    height: 160px;
    margin: 0 auto 8%;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.28);
    border-radius: 10px;
  }
  .title_myBook {
    font-size: 15px;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto;
  }
  .reportBtn {
    display: none;
    z-index: 100;
    background: none;
    border: none;
    outline: none;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    height: 20%;
  }
  .reportBtn > svg {
    width: 100%;
    height: 100%;
  }

  &:hover .cardWrapper,
  &.hover .cardWrapper {
    transform: rotateY(180deg);
  }

  .cardWrapper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .front > * {
    display: block;
  }

  .back {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    position: absolute;
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
  }

  .back {
    padding: 10%;
    font-size: 16px;
    font-weight: 700;
  }

  .back > a {
    display: block;
    color: #ffa2a2;
  }
  .back > a > svg {
    margin: 4% auto 0;
    width: 15%;
    height: auto;
    display: block;
    fill: #ffa2a2;
  }
`;

const MyBookList = ({ myLibrary, bookListClickHandler }) => {
  return (
    <BookListWrapper>
      <div className="cardWrapper">
        <div className="front">
          <img className="thumbnail_myBook" src={myLibrary.bookImage} />
          <strong className="title_myBook">{myLibrary.bookTitle}</strong>
          <span className="authors_myBook">{myLibrary.bookAuthor}</span>
          <span className="rate_myBook">
            <Rate disabled defaultValue={myLibrary.bookRate} />
          </span>
        </div>
        <div className="back" onClick={() => bookListClickHandler(myLibrary)}>
          <Link to="/WriteReport">
            독후감 작성하기
            <BsPencilSquare />
          </Link>
        </div>
      </div>
    </BookListWrapper>
  );
};

export default MyBookList;
