import axios from 'axios';

export const signIn = ({ email, password }) =>
  axios.post("http://localhost:3002/users/signIn", { email, password });

export const signUp = ({ name, email, password }) =>
  axios.post("http://localhost:3002/users/signUp", { name, email, password });

// 책 추가
export const bookSave = ({ bookUuid, bookTitle, bookAuthor, bookImage, bookRate }) => 
  axios.post('http://localhost:3002/myLibrary/addBooks', { bookUuid, bookTitle, bookAuthor, bookImage, bookRate }, {
  headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 책 정보 불러오기
export const bookListLoad = () =>
  axios.get("http://localhost:3002/myLibrary/getAllBooks", {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 책 삭제
export const bookDelete = ({ bookUuid }) =>
  axios.post("http://localhost:3002/myLibrary/deleteBooks", { bookUuid }, {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

