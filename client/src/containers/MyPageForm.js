import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaUserEdit } from "react-icons/fa";
import { modifyName } from "../lib/commonAPI";

const MyPageFormWrapper = styled.div`
  & > .infoPart {
    margin-bottom: 50px;
    & > * {
      display: block;
      margin: 0 auto;
      text-align: center;
      margin-top: 30px;
    }
    & > strong {
      font-size: 24px;
      letter-spacing: 1px;
    }
  }
  & > .modifyPart {
    text-align: center;
    color: #6a9bd8;
    & button {
      background: #ebf5fc;
      border: none;
      border-radius: 10px;
      outline: none;
      box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
      transition: all 0.2s ease-in-out;
      font-size: 18px;
      font-weight: 600;
      width: 150px;
      height: 50px;
      &:hover {
        box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
      }
    }
    & > input {
      outline: none;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
      border: none;
      border-radius: 10px;
      width: 40%;
      line-height: 50px;
      font-size: 18px;
      padding-left: 10px;
      display: block;
      margin: 30px auto 0;
    }
  }
`;

const MyPageForm = () => {
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("user")).name
  );
  const [clickModifyName, setclickModifyName] = useState(false);
  const [input, setInput] = useState("");

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitModifyName = () => {
    setclickModifyName(false);
  };

  return (
    <MyPageFormWrapper>
      <div className="infoPart">
        <Avatar
          size={124}
          style={{
            color: "#6a9bd8",
            backgroundColor: "#ebf5fc",
            fontSize: "44px",
          }}
        >
          {userName.substr(0, 1)}
        </Avatar>
        <strong>{`${userName} 님 안녕하세요!`}</strong>
      </div>
      <div className="modifyPart">
        {clickModifyName ? (
          <button onClick={() => submitModifyName()}>변경</button>
        ) : (
          <button onClick={() => setclickModifyName(true)}>
            내 이름 변경하기
          </button>
        )}
        {clickModifyName && (
          <input
            type="text"
            value={input}
            onChange={(e) => onChangeHandler(e)}
          />
        )}
      </div>
    </MyPageFormWrapper>
  );
};

export default MyPageForm;
