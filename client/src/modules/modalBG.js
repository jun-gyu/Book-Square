import { createAction, handleActions } from "redux-actions";

const MODAL_BG = "modalBG/MODAL_BG";

export const modalBG = createAction(MODAL_BG, (bool) => bool);

const initialState = {
  bool: false,
};

const modalLoading = handleActions(
  {
    [MODAL_BG]: (state, { payload: bool }) => ({
      ...state,
      bool: bool,
    }),
  },
  initialState
);

export default modalLoading;
