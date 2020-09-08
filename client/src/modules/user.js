import { createAction, handleActions } from "redux-actions";

const LOGGED_USERINFO = "user/LOGGED_USERINFO";

// 요청을 위한 액션 타입을 payload로 설정

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
