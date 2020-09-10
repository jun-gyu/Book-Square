import { createAction, handleActions } from "redux-actions";

const [GET_ALL_BOOKS] = "getAllBooks/GET_ALL_BOOKS";

export const getAllBooks = createAction(GET_ALL_BOOKS);

const initialState = {
  getAllBooks: null,
};

export const getAllBooksAction = handleActions(
  {
    [GET_ALL_BOOKS]: (state, { payload: books }) => ({
      ...state,
      getAllBooks: books,
    }),
  },
  initialState
);

export default getAllBooksAction;
