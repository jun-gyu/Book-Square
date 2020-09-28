import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import DiscussionChat from '../components/DiscussionChat';
import styled from "styled-components";
import { RiMailSendLine } from 'react-icons/ri';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { v4 as uuidv4 } from "uuid";

const socket = io.connect("http://localhost:3100");


const DiscussionRoomFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > strong {
    font-family: "Baloo Tammudu 2", cursive;
    display: block;
    text-align: center;
    font-size: 36px;
    color: #f67472;
    text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
    letter-spacing: 1px;
    text-align: center;
  }
  & > .renderChat {
    width: 100%;
    height: 60%;
    padding: 10px 20px;
  }
  & > .chatInput {
    width: 100%;
    height: 30%;
    background: #f0f3f9;
    padding: 15px;
    & > strong {
      display: block;
      font-size: 26px;
      color: #8cb2ff;
      font-family: "Baloo Tammudu 2", cursive;
    }
    & > form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      & label {
        display: block;
        font-weight: 600;
        font-size: 16px;
        margin: 10px 0;
        color: #777;
      }
      & > .bookTitleInput {
        width: 30%;
        & > input {
          outline: none;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 2px solid #8cb2ff;
          width: 200px;
          height: 30px;
          font-size: 14px;
          font-weight: 600;
        }
      }
      & > .messageInput {
        width: 70%;
        position: relative;
        & > textarea {
          resize: none;
          width: 90%;
          height: 100px;
          border: none;
          border-radius: 10px;
          padding: 5px 5px 0 50px;
          outline: none;
          &:focus {
            border: 2px solid #8cb2ff;
          }
        }
        & > svg {
          position: absolute;
          top: 53px;
          left: 10px;
          width: 20px;
          height: 20px;
          color: #8cb2ff;
        }
        & > button {
          border: none;
          background: none;
          width: 10%;
          outline: none;
          cursor: pointer;
          & > svg {
            width: 100%;
            height: 30px;
            color: #8cb2ff;
          }
        }
      }
    }
  }
`;

const DiscussionRoomForm = () => {

  const [chatInfo, setChatInfo] = useState({
    message:
      "",
    name: JSON.parse(localStorage.getItem("user")).name,
    bookTitle: "",
  });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, bookTitle, message }) => {
      setChat([...chat, { name, bookTitle, message }]);
    });
  }, [chat]);

  const onTextChange = (e) => {
    setChatInfo({ ...chatInfo, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, bookTitle, message } = chatInfo;
    socket.emit("message", { name, bookTitle, message });
    setChatInfo({ message: "", name, bookTitle });
  };


  return (
    <DiscussionRoomFormWrapper>
      <strong>Discussion Room</strong>
      <div className="renderChat">
        {chat.map((chatItem) => (
          <DiscussionChat key={uuidv4()} chatItem={chatItem} />
        ))}
      </div>
      <div className="chatInput">
        <strong>Messanger</strong>
        <form onSubmit={onMessageSubmit}>
          <section className="bookTitleInput">
            <label htmlFor="bookTitle">책 제목</label>
            <input
              id="bookTitle"
              name="bookTitle"
              onChange={(e) => onTextChange(e)}
              value={chatInfo.bookTitle}
              label="책 제목"
            />
          </section>
          <section className="messageInput">
            <label htmlFor="message">메세지</label>
            <BsFillChatDotsFill />
            <textarea
              id="message"
              name="message"
              onChange={(e) => onTextChange(e)}
              value={chatInfo.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
            <button>
              <RiMailSendLine />
            </button>
          </section>
        </form>
      </div>
    </DiscussionRoomFormWrapper>
  );
};

export default DiscussionRoomForm;