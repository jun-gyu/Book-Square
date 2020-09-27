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

// 클릭한 책에 대한 독후감 불러오기
export const clickBookReportLoad = ({ bookUuid }) =>
  axios.post("http://localhost:3002/report/getAllReport", { bookUuid }, {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 새 독후감 저장
export const newReportSave = ({ bookUuid, reportUuid, reportMemo }) => 
  axios.post('http://localhost:3002/report/addReport', { bookUuid, reportUuid, reportMemo }, {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 독후감 수정 
export const reportUpdateSave = ({ reportUuid, reportMemo }) => 
  axios.post('http://localhost:3002/report/updateReport', { reportUuid, reportMemo }, {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 독후감 삭제
export const reportDelete = ({ reportUuid }) =>
  axios.post("http://localhost:3002/report/deleteReport", { reportUuid }, {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 독후감이 있는 책만 불러오기
export const theBooksWithReport = () =>
  axios.get("http://localhost:3002/report/theBooksWithReport", {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 독후감 많은 순서로 정렬
export const howManyWriteReport = () =>
  axios.get("http://localhost:3002/report/howManyWriteReport", {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 유저 이름 변경
export const modifyName = ({ name }) => 
  axios.put("http://localhost:3002/users/modifyName", { name }, {
    headers: { "auth-token": JSON.parse(localStorage.getItem("user")).token },
  });

// 카테고리 설정
export const categorySearch = (select) =>
  axios.post("http://localhost:3002/categorySearch", {select});