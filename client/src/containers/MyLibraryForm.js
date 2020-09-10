import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyBookList from "../components/MyBookList";
import { v4 as uuidv4 } from "uuid";
import { bookListLoad } from "../lib/commonAPI";
import { useDispatch, useSelector } from "react-redux";
import { currentBookList } from "../modules/currentBookList";
import { getAllBooks } from "../modules/getAllBooks";
import myLibraryIMG from "../images/myLibraryIMG1.jpg";

const MyLibraryFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > .information {
    background: url(${myLibraryIMG}) no-repeat 50% 100% / 110% 260%;
    width: 100%;
    height: 400px;
    padding: 50px;
    & > * {
      display: block;
      color: #fff;
      text-align: center;
    }
    & > span {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
    }
    & > strong {
      font-size: 24px;
      letter-spacing: 1px;
      margin-top: 15px;
    }
  }
  & > .myBookLists {
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 80%;
    margin-top: -35px;
    padding-top: 30px;
    background: #fff;
    border-radius: 35px 35px 0 0;
  }
  .noBookMessage,
  .plzSignInMessage {
    display: block;
    font-size: 24px;
    font-weight: 600;
    color: #cfcfcf;
    line-height: 100px;
  }
`;

const MyLibraryForm = () => {
  const dispatch = useDispatch();

  const [loggedUserCheck, setLoggedUserCheck] = useState(false);

  const loggedUser = useSelector(({ loggedUser }) => ({ loggedUser: loggedUser.user })).loggedUser;

  const myLibraryBookLists = useSelector(
    (state) => state.getAllBooks.getAllBooks
  );

  useEffect(() => {
    console.log(loggedUser);
    loggedUser &&
      bookListLoad()
        .then((data) => dispatch(getAllBooks(data.data)))
        .then((data) => setLoggedUserCheck(true));
  }, []);

  const bookListClickHandler = (item) => {
    dispatch(
      currentBookList({
        bookUuid: item.bookUuid,
        bookTitle: item.bookTitle,
        bookAuthor: item.bookAuthor,
        bookImage: item.bookImage,
        bookRate: item.bookRate,
      })
    );
  };

  return (
    <MyLibraryFormWrapper>
      {loggedUserCheck && myLibraryBookLists ? (
        <>
          <section className="information">
            <span>{loggedUser.name}님의 서재</span>
            <strong>
              내 서재에 총 {myLibraryBookLists ? myLibraryBookLists.length : 0}권의 책이 있습니다!
            </strong>
          </section>
          <section className="myBookLists">
            {myLibraryBookLists.map((el) => (
              <MyBookList
                myLibrary={el}
                key={uuidv4()}
                bookListClickHandler={bookListClickHandler}
              />
            ))}
          </section>
        </>
      ) : loggedUser && !myLibraryBookLists ? (
        <span className="noBookMessage">책을 등록해주세요!</span>
      ) : (
        !loggedUser && (
          <span className="plzSignInMessage">로그인을 해주세요.</span>
        )
      )}
    </MyLibraryFormWrapper>
  );
};

export default MyLibraryForm;
