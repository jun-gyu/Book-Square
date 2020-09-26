import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import MyBookList from "../components/MyBookList";
import { v4 as uuidv4 } from "uuid";
import {
  bookListLoad,
  bookDelete,
  theBooksWithReport,
  howManyWriteReport,
} from "../lib/commonAPI";
import { useDispatch, useSelector } from "react-redux";
import { currentBookList } from "../modules/currentBookList";
import { getAllBooks } from "../modules/getAllBooks";
import { withRouter } from "react-router-dom";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { modalBG } from "../modules/modalBG";

const MyLibraryFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > .myBookLists {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    & > * {
      color: #111;
    }
    & > .infoPart {
      padding: 50px 0;
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
    & > .filterBook {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding-bottom: 30px;
      & > button {
        border: none;
        background: none;
        outline: none;
        border-radius: 20px;
        cursor: pointer;
        width: 150px;
        height: 40px;
        color: #61677c;
        box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
        transition: all 0.2s ease-in-out;
        font-weight: 600;
        font-size: 18px;
        &:hover {
          box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
        }
      }
    }
    & > .bookListPart {
      width: 100%;
      margin: 70px 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .noBookMessage,
  .plzSignInMessage {
    display: block;
    font-size: 24px;
    font-weight: 600;
    color: #cfcfcf;
    line-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
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

  const allMyBookLists = (text) => {
    if(text === "allBook"){
      bookListLoad().then((data) => {
        setMyLibraryBookLists(data.data);
      });
    }else if(text === "reportBook"){
      theBooksWithReport().then(data => {
        setMyLibraryBookLists(data.data);
      });
    }else if(text === "rateOrder"){
      bookListLoad().then((data) => {
        let sortArr = data.data.sort((a, b) => {
          return a.bookRate > b.bookRate ? -1 : a.bookRate < b.bookRate ? 1 : 0;
        });
        setMyLibraryBookLists(sortArr);
      });
    }else if(text === "reportOrder"){
      howManyWriteReport().then(data => {
        setMyLibraryBookLists(data.data);
      });
    }
  }

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
          <div className="infoPart">
            <span>{loggedUser.name}님의 서재</span>
            <strong>
              총 {myLibraryBookLists ? myLibraryBookLists.length : 0} 권의 책이
              있습니다!
            </strong>
          </div>
          <div className="filterBook">
            <button onClick={() => allMyBookLists("allBook")}>전체보기</button>
            <button onClick={() => allMyBookLists("reportBook")}>
              내 독후감
            </button>
            <button onClick={() => allMyBookLists("rateOrder")}>평점순</button>
            <button onClick={() => allMyBookLists("reportOrder")}>
              독후감순
            </button>
          </div>
          <div className="bookListPart">
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
        {deleteConfirmModal && (
          <DeleteConfirmModal deleteBookHandler={deleteBookHandler} />
        )}
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
