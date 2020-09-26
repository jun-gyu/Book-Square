import React, { useState } from "react";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import { useEffect } from "react";

const ReportListsWrapper = styled.div`
  position: relative;
  cursor: pointer;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 3%;
  height: 100px;
  box-sizing: border-box;
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
    margin-bottom: 15px;
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
    text-overflow: ellipsis;
    &.editing {
      box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.28);
    }
  }
`;

const ReportList = ({ reportList, reportUpdateHandler, deleteReportHandler }) => {
  const [clickReportModified, setClickReportModified] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(reportList.reportMemo)
  },[])

  const inputReadOnlyHandler = () => {
    setClickReportModified(clickReportModified ? false : true);
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  }

  const reportSave = () => {
    setClickReportModified(clickReportModified ? false : true);
    reportUpdateHandler(reportList, input);
    setInput("");
  };

  return (
    <ReportListsWrapper>
      <input
        type="text"
        value={input}
        onChange={(e) => onChangeHandler(e)}
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
        onClick={() => deleteReportHandler(reportList.reportUuid)}
      />
    </ReportListsWrapper>
  );
};

export default ReportList;
