import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as commonAPI from "../lib/commonAPI";

const [BOOK_SAVE] = createRequestActionTypes("bookSave/BOOK_SAVE");

export const bookSave = createAction(
  BOOK_SAVE,
  ({ bookUuid, bookTitle, bookAuthor, bookImage, bookRate }) => ({
    bookUuid,
    bookTitle,
    bookAuthor,
    bookImage,
    bookRate,
  })
);

const bookSaveSaga = createRequestSaga(BOOK_SAVE, commonAPI.bookSave);
export function* saveSaga() {
  yield takeLatest(BOOK_SAVE, bookSaveSaga);
}

const initialState = {
  bookUuid: "",
  bookTitle: "",
  bookAuthor: "",
  bookImage: "",
  bookRate: "",
};

const bookSaveAction = handleActions(
  {
    [BOOK_SAVE]: (state, { payload }) => ({
      ...state,
      bookUuid: payload.bookUuid,
      bookTitle: payload.bookTitle,
      bookAuthor: payload.bookAuthor,
      bookImage: payload.bookImage,
      bookRate: payload.bookRate,
    }),
  },
  initialState
);

export default bookSaveAction;
