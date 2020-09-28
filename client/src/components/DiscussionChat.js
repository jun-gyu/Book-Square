import React from 'react';
import styled from 'styled-components';
import { Avatar } from "antd";

const DiscussionChatWrapper = styled.div`
  & > section {
    display: inline-block;
    margin-left: 20px;
    max-width: 50%;
    & > strong {
      font-size: 18px;
      margin-right: 15px;
    }
    & > span {
      font-size: 16px;
      font-weight: 500;
    }
    & > p {
      background: #ebf5fc;
      border-radius: 10px;
      font-size: 16px;
      width: 100%;
      height: auto;
      padding: 10px;
      word-break: break-all;
      box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.28);
      margin-top: 5px;
    }
  }
`;

const DiscussionChat = (chatInfo) => {
  const {bookTitle, message, name} = chatInfo.chatInfo;
  return (
    <DiscussionChatWrapper>
      <Avatar
        size={40}
        style={{
          color: "#8cb2ff",
          backgroundColor: "#ebf5fc",
          fontSize: "18px",
          fontWeight: "600",
          display: "inline-block",
          verticalAlign: "top"
        }}
      >
        {name.substr(0, 1)}
      </Avatar>
      <section>
        <strong>{name}</strong>
        <span>{`책 제목 : ${bookTitle}`}</span>
        <p>{message}</p>
      </section>
    </DiscussionChatWrapper>
  );
};

export default DiscussionChat;