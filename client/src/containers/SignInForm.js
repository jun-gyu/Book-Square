/* eslint no-restricted-globals: ["off"] */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, signIn } from "../modules/auth";
import AuthForm from "../components/common/AuthForm";
import { withRouter } from 'react-router-dom';
import { loggedUserInfo } from "../modules/user";

const SignInForm = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.signIn,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const onChangeInputHandler = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "signIn",
        key: name,
        value,
      })
    );
  };

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(signIn({ email, password }));
  };

  // 로그인 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log("로그인 에러", authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공", auth);
      localStorage.setItem('user', JSON.stringify(auth));
      dispatch(loggedUserInfo(auth));
      history.push("/");
    }
  }, [auth, authError, history, dispatch]);

  // 컴포넌트 첫 렌더링 될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm("signIn"));
  }, [dispatch]);


  return (
    <AuthForm
      type="SignIn"
      form={form}
      onChangeInputHandler={onChangeInputHandler}
      onSubmitFormHandler={onSubmitFormHandler}
      error={error}
    />
  );
};

export default withRouter(SignInForm);
