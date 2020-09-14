import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";

const WriteReportWrapper = styled.div``;

const WriteReport = () => {

  let { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = useSelector(
    (state) => ({
      bookUuid: state.currentBookList.bookUuid,
      bookTitle: state.currentBookList.bookTitle,
      bookAuthor: state.currentBookList.bookAuthor,
      bookImage: state.currentBookList.bookImage,
      bookRate: state.currentBookList.bookRate,
    })
  );

  return (
    <WriteReportWrapper>
      fds
    </WriteReportWrapper>
  );
};

export default WriteReport;