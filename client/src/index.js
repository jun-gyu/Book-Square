import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { Provider } from "react-redux";
import { loggedUserInfo } from './modules/user';

// 사가 미들웨어 만들기
const sagaMiddleware = createSagaMiddleware();
// applyMiddleware(sagaMiddleware)로 사가 미들웨어 적용
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser(){
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) return;
    store.dispatch(loggedUserInfo(user));
  }catch(err) {
    console.log('localStorage is not working');
  }
}

// 루트 사가를 실행해준다. 주의할점!!! 스토어 생성이 된 다음에 실행해주어야 한다.
sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
