import React from 'react';
import styled from 'styled-components';


const SearchBookListWrapper = styled.div`
  width: 10%;
  display: inline-block;
  cursor: pointer;
  margin: 3% 3% 0;
  & > * {
    display: block;
  }
  & > img {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 0 4px 4px 0;
    width: 100%;
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

const SearchBookList = ({bookList}) => {

  return (
    <SearchBookListWrapper>
      <img src={bookList.bookImage} alt="미리보기 이미지" />
      <strong>{bookList.bookTitle}</strong>
      <span>{bookList.bookAuthor}</span>
    </SearchBookListWrapper>
  );
};

export default SearchBookList;