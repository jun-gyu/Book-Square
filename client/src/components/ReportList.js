import React, { useState } from "react";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaCheck } from "react-icons/fa";

const ReportListsWrapper = styled.div`
  position: relative;
  cursor: pointer;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 3%;
  height: 150px;
  box-sizing: border-box;
  .reportMessage {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    width: 70%;
    display: block;
  }
  .registrationDate {
    position: absolute;
    bottom: 3%;
    right: 3%;
  }
  .modified,
  .deleteReport,
  .saveReportModified {
    position: absolute;
    top: 10%;
    cursor: pointer;
    padding: 0;
    background: none;
    border: none;
    outline: none;
    width: 20px;
    height: 20px;
    & > svg {
      width: 100%;
      height: 100%;
    }
  }
  .modified {
    right: 10%;
  }
  .deleteReport {
    right: 3%;
  }
  .saveReportModified {
    right: 10%;
  }
  .reportListTemp {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
    background: none;
    outline: none;
    font-size: 18px;
    font-weight: 500;
    padding: 2%;
    border-radius: 10px;
    &.editing {
      box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.28);
    }
  }
`;

const ReportList = ({ reportList, reportUpdateHandler, deleteReportHandler }) => {
  console.log(reportList)
  const [clickReportModified, setClickReportModified] = useState(true);

  const inputReadOnlyHandler = () => {
    const inputEl = document.querySelector(".reportListTemp");
    setClickReportModified(clickReportModified ? false : true);
    console.log(inputEl);
    inputEl.value = inputEl.getAttribute("placeholder");
  };

  const reportSave = () => {
    setClickReportModified(clickReportModified ? false : true);
    const inputEl = document.querySelector(".reportListTemp").value;
    console.log(inputEl)
    reportUpdateHandler(reportList, inputEl);
  };

  return (
    <ReportListsWrapper>
      <input
        type="text"
        placeholder={reportList.reportMemo}
        className={
          clickReportModified ? "reportListTemp" : "reportListTemp editing"
        }
        readOnly={clickReportModified}
      />
      {clickReportModified ? (
        <FaPencilAlt
          className="modified"
          onClick={() => inputReadOnlyHandler()}
        />
      ) : (
        <FaCheck className="saveReportModified" onClick={() => reportSave()} />
      )}
      <RiDeleteBin6Line
        className="deleteReport"
        onClick={() =>
          deleteReportHandler(reportList.reportUuid)
        }
      />
    </ReportListsWrapper>
  );
};

export default ReportList;
