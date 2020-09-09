import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from "../lib/commonAPI";

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] = createRequestActionTypes('auth/SIGNIN');
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('auth/SIGNUP');
const [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAILURE] = createRequestActionTypes('auth/SIGNOUT');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // signUp, signIn
    key, // name, password, passwordCheck
    value, // 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // signUp, signIn form 초기화


export const signUp = createAction(
  SIGNUP,
  ({ name, email, password }) => ({
    name,
    email,
    password,
  })
);

export const signIn = createAction(SIGNIN, ({ email, password }) => ({
  email,
  password,
}));

export const signOut = createAction(SIGNOUT);

// saga 생성
const signUpSaga = createRequestSaga(SIGNUP, authAPI.signUp);
const signInSaga = createRequestSaga(SIGNIN, authAPI.signIn);

export function* authSaga() {
  // takeLatest : 가장 마지막으로 디스패치 된 액션만을 처리
  yield takeLatest(SIGNUP, signUpSaga);
  yield takeLatest(SIGNIN, signInSaga);
}

const initialState = {
  signUp: {
    name: "",
    email: "",
    password: "",
  },
  signIn: {
    email: "",
    password: "",
  },
  auth: null,
  authError: null,
  signUpSuccess: false,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // state.signUp.name 같은 값을 바꾸는 작업
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    // 회원가입 성공
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
      signUpSuccess: true,
    }),
    // 회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [SIGNOUT]: (state, { payload: auth }) => ({
      ...state,
      auth: auth,
      authError: null,
    }),
  },
  initialState
);

export default auth;