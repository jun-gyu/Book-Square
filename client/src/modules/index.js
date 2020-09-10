import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import loggedUser from "./user";
import modalLoading from "./modalBG";
import bookSave, { saveSaga } from "./bookSave";
// import currentBookList from "./currentBookList";

const rootReducer = combineReducers({
  auth,
  loading,
  loggedUser,
  modalLoading,
  bookSave,
  // currentBookList,
});

export function* rootSaga(){
  yield all([authSaga(), saveSaga()]);
};

export default rootReducer;