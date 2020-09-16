import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import MyBookList from "../components/MyBookList";
import { v4 as uuidv4 } from "uuid";
import { bookListLoad } from "../lib/commonAPI";
import { useDispatch, useSelector } from "react-redux";
import { currentBookList } from "../modules/currentBookList";
import { getAllBooks } from "../modules/getAllBooks";
import myLibraryIMG from "../images/myLibraryIMG.jpg";
import { bookDelete } from "../lib/commonAPI";
import { withRouter } from "react-router-dom";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { modalBG } from "../modules/modalBG";

const MyLibraryFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > .myBookLists {
    background: url(${myLibraryIMG}) no-repeat 50% 100% / 110% 260%;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    & > * {
      color: #fff;
    }
    & > div {
      width: 100%;
      margin: 70px 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    & > span {
      display: block;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      text-align: center;
    }
    & > strong {
      display: block;
      font-size: 24px;
      letter-spacing: 1px;
      margin-top: 15px;
      text-align: center;
    }
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


const MyLibraryForm = ({ history }) => {
  const dispatch = useDispatch();

  const [loggedUserCheck, setLoggedUserCheck] = useState(false);
  const [myLibraryBookLists, setMyLibraryBookLists] = useState(null);
  const [currentDeleteBookUuid, setCurrentDeleteBookUuid] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const loggedUser = useSelector(({ loggedUser }) => ({
    loggedUser: loggedUser.user,
  })).loggedUser;

  useEffect(() => {
    loggedUser &&
      bookListLoad().then((data) => {
        dispatch(getAllBooks(data.data));
        setMyLibraryBookLists(data.data);
        setLoggedUserCheck(true);
      });
  }, []);

  const writeReportHandler = (item) => {
    dispatch(
      currentBookList({
        bookUuid: item.bookUuid,
        bookTitle: item.bookTitle,
        bookAuthor: item.bookAuthor,
        bookImage: item.bookImage,
        bookRate: item.bookRate,
      })
    );
    localStorage.setItem(
      "writeReportBookInfo",
      JSON.stringify({
        bookUuid: item.bookUuid,
        bookTitle: item.bookTitle,
        bookAuthor: item.bookAuthor,
        bookImage: item.bookImage,
        bookRate: item.bookRate,
      })
    );
    history.push("/WriteReport");
  };

  const deleteBookConfirmHandler = (currentDeleteBook) => {
    setCurrentDeleteBookUuid(currentDeleteBook.bookUuid);
    setDeleteConfirmModal(true);
    dispatch(modalBG(true));
  };

  const deleteBookHandler = (bool) => {
    if (bool) {
      bookDelete({ bookUuid : currentDeleteBookUuid });
      window.location.replace("/MyLibrary");
    }
    setDeleteConfirmModal(false);
    dispatch(modalBG(false));
  };

  const renderOrDetails = useMemo(() => {

    return loggedUserCheck && myLibraryBookLists ? (
      <>
        <section className="myBookLists">
          <span>{loggedUser.name}님의 서재</span>
          <strong>
            내 서재에 총 {myLibraryBookLists ? myLibraryBookLists.length : 0}
            권의 책이 있습니다!
          </strong>
          <div>
            {myLibraryBookLists.map((el) => (
              <MyBookList
                myLibrary={el}
                key={uuidv4()}
                writeReportHandler={writeReportHandler}
                deleteBookConfirmHandler={deleteBookConfirmHandler}
              />
            ))}
          </div>
        </section>
        {deleteConfirmModal && <DeleteConfirmModal deleteBookHandler ={deleteBookHandler}/>}
      </>
    ) : loggedUser && !myLibraryBookLists ? (
      <span className="noBookMessage">책을 등록해주세요!</span>
    ) : (
      !loggedUser && (
        <span className="plzSignInMessage">로그인을 해주세요.</span>
      )
    );
  }, [loggedUser, myLibraryBookLists, loggedUserCheck, deleteConfirmModal]);

  return <MyLibraryFormWrapper>{renderOrDetails}</MyLibraryFormWrapper>;
};

export default withRouter(MyLibraryForm);
