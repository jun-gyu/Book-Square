import React from 'react';
import styled from 'styled-components';
import { Rate } from "antd";

const SearchBookListWrapper = styled.div`
  width: 10%;
  display: inline-block;
  cursor: pointer;
  margin: 3% 3% 0;
  & > * {
    display: block;
  }
  &:hover > img {
    transform: rotateZ(5deg);
    transition: all 0.5s ease;
  }
  & > img {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 0 4px 4px 0;
    width: 100%;
    transition: all 0.5s ease;
  }
  & > strong {
    margin: 15px 0 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #444;
  }
  & > span {
    font-size: 12px;
    color: #777;
  }
`;

const SearchBookList = ({ bookList, clickedBook }) => {
  return (
    <SearchBookListWrapper onDoubleClick={() => clickedBook(bookList)}>
      <img src={bookList.bookImage} alt="미리보기 이미지" />
      <strong>{bookList.bookTitle}</strong>
      <span>{bookList.bookAuthor}</span>
      {bookList.bookRate && <Rate disabled defaultValue={bookList.bookRate} />}
    </SearchBookListWrapper>
  );
};

export default SearchBookList;