import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import bookIMG from "../images/book.png";
import { Rate } from "antd";
import ReportList from "../components/ReportList";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { v4 as uuidv4 } from "uuid";
import {
  clickBookReportLoad,
  newReportSave,
  reportUpdateSave,
  reportDelete,
} from "../lib/commonAPI";
import { modalBG } from "../modules/modalBG";

const WriteReportWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 650px;
    height: 700px;
    background: url(${bookIMG}) no-repeat 50% 50% / 150% 110%;
    transform: rotate(25deg);
  }
  & > div {
    width: 80%;
    height: 100%;
    padding: 70px 0 0 50px;
    display: flex;
    & > .leftPart,
    & > .rightPart {
      text-align: center;
    }
    & > .leftPart {
      margin-right: 50px;
      width: 60%;
      height: 90%;
    }
    & > .rightPart {
      & > * {
        display: block;
        margin: 0 auto;
      }
      & > img {
        border-radius: 0 4px 4px 0;
      }
      & > strong {
        font-size: 18px;
        margin: 30px 0 10px;
      }
      & > span {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 30px;
      }
    }
    .ant-rate-star-zero .ant-rate-star-first,
    .ant-rate-star-zero .ant-rate-star-second {
      color: #e0e0e0;
    }
  }
`;

const WriteReport = () => {

  const dispatch = useDispatch();
  const [writeReportClicked, setWriteReportClicked] = useState(false);
  const [bookReport, setBookReport] = useState([]);
  const [deleteReportUuid, setDeleteReportUuid] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  let writeReportBookInfo = JSON.parse(localStorage.getItem("writeReportBookInfo"));

  useEffect(() => {
    clickBookReportLoad({ bookUuid: writeReportBookInfo.bookUuid })
      .then((data) => {
        localStorage.setItem("currentBookReportLists", JSON.stringify(data.data));
        setBookReport(JSON.parse(localStorage.getItem("currentBookReportLists")));
        setWriteReportClicked(true);
      });
  }, [writeReportClicked, deleteConfirmModal]);

  // const onChangeReportValue = (e) => {
  //   setReportValue(e.target.value);
  // }

  const NewReportSaveHandler = () => {
    let reportMemo = document.querySelector(".writeReportInput").value;
    let reportUuid = uuidv4();
    newReportSave({
      bookUuid: writeReportBookInfo.bookUuid,
      reportUuid,
      reportMemo
    }).then((data) => setWriteReportClicked(false));
  };

  const reportUpdateHandler = (reportList, reportValue) => {
    const currentBookReportLists = JSON.parse(localStorage.getItem("currentBookReportLists"));
    const updateReport = currentBookReportLists.filter((item) => {
      let result = [];
      if (item.reportUuid === reportList.reportUuid) {
        console.log(reportValue);
        item.reportMemo = reportValue;
        result.push(item);
      }else {
        result.push(item)
      }
      return result;
    });
    console.log(updateReport)
    localStorage.setItem("currentBookReportLists", JSON.stringify(updateReport));
    setBookReport(JSON.parse(localStorage.getItem("currentBookReportLists")));
    reportUpdateSave({ reportUuid: reportList.reportUuid, reportMemo: reportValue });
  };

  const deleteReportHandler = (reportUuid) => {
    setDeleteReportUuid(reportUuid);
    setDeleteConfirmModal(true);
    dispatch(modalBG(true));
  };

  const deleteConfirmModalHandler = (bool) => {
    if(bool){
      reportDelete({ reportUuid: deleteReportUuid })
        .then(data => setDeleteConfirmModal(false), dispatch(modalBG(false)));
    }else {
      setDeleteConfirmModal(bool);
      dispatch(modalBG(false));
    }
  };


  return (
    <WriteReportWrapper>
      <div>
        <section className="leftPart">
          <textarea
            placeholder="여기에 독후감을 작성해주세요!"
            className="writeReportInput"
          />
          <button
            className="saveReport reportBtn"
            onClick={() => NewReportSaveHandler()}
          >
            저장
          </button>
          {bookReport.length > 0 ? (
            bookReport.map((el) => (
              <ReportList
                reportList={el}
                key={uuidv4()}
                reportUpdateHandler={reportUpdateHandler}
                deleteReportHandler={deleteReportHandler}
              />
            ))
          ) : (
            <span>작성한 독후감이 없습니다</span>
          )}
        </section>
        <section className="rightPart">
          <img src={writeReportBookInfo.bookImage} alt="책 미리보기 이미지" />
          <strong>{writeReportBookInfo.bookTitle}</strong>
          <span>{writeReportBookInfo.bookAuthor}</span>
          <span className="rate_myBook">
            <Rate
              disabled
              defaultValue={writeReportBookInfo.bookRate}
              style={{ fontSize: 36 }}
            />
          </span>
        </section>
        {deleteConfirmModal && (
          <DeleteConfirmModal deleteBookHandler={deleteConfirmModalHandler} />
        )}
      </div>
    </WriteReportWrapper>
  );
};

export default WriteReport;