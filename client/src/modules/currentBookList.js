import { createAction, handleActions } from "redux-actions";

const CURRENT_BOOKLIST = "currentBookList/CURRENT_BOOKLIST";

export const currentBookList = createAction(
  CURRENT_BOOKLIST,
  ({ bookUuid, bookTitle, bookAuthor, bookImage, bookRate }) => ({
    bookUuid,
    bookTitle,
    bookAuthor,
    bookImage,
    bookRate,
  })
);

const initialState = {
  bookUuid: "",
  bookTitle: "",
  bookAuthor: "",
  bookImage: "",
  bookRate: "",
};

export const currentBookListAction = handleActions(
  {
    [CURRENT_BOOKLIST]: (state, { payload }) => ({
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

export default currentBookListAction;
