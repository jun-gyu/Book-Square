import axios from 'axios';

const headers = {
  headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
};

export const signIn = ({ email, password }) =>
  axios.post("http://localhost:3002/users/signIn", { email, password });

export const signUp = ({ name, email, password }) =>
  axios.post("http://localhost:3002/users/signUp", { name, email, password });

// 책 추가
export const bookSave = ({ bookUuid, bookTitle, bookAuthor, bookImage, bookRate }) => 
  axios.post('http://localhost:3002/myLibrary/addBooks', { bookUuid, bookTitle, bookAuthor, bookImage, bookRate }, headers);

// 책 정보 불러오기
export const bookListLoad = () =>
  axios.get("http://localhost:3002/myLibrary/getAllBooks" , headers);