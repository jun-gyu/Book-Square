import { createAction, handleActions } from "redux-actions";

const LOGGED_USERINFO = "user/LOGGED_USERINFO";

export const loggedUserInfo = createAction( LOGGED_USERINFO, userInfo => userInfo );

const initialState = {
  user: null,
};

const loggedUser = handleActions(
  {
    [LOGGED_USERINFO]: (state, {payload: user}) => ({
      ...state,
      user,
    }),
  },
  initialState
);

export default loggedUser;
