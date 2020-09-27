import React from 'react';
import styled from 'styled-components';

const CategorySearchBookWrapper = styled.div`
  text-align: center;
  display: inline-block;
  max-width: 200px;
  & > * {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > img {
    height: 160px;
    margin: 0 auto 8%;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.28);
    border-radius: 10px;
  }
`;

const CategorySearchBook = (data) => {
  console.log(data)
  return (
    <CategorySearchBookWrapper>
      <img src={data.data.image} alt="책 미리보기 이미지" />
      <strong className="title_myBook">{data.data.title}</strong>
      <span className="authors_myBook">{data.data.author[0]}</span>
    </CategorySearchBookWrapper>
  );
};

export default CategorySearchBook;