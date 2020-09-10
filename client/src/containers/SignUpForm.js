import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, signUp } from "../modules/auth";
import AuthForm from "../components/common/AuthForm";
import { withRouter } from 'react-router-dom';

const SignUpForm = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, signUpSuccess } = useSelector(({ auth }) => ({
    form: auth.signUp,
    auth: auth.auth,
    authError: auth.authError,
    signUpSuccess: auth.signUpSuccess,
  }));

  const onChangeInputHandler = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "signUp",
        key: name,
        value,
      })
    );
  };

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    const { name, email, password, passwordCheck } = form;
    if(password !== passwordCheck){
      setError('비밀번호가 일치하지 않습니다.');
      changeField({ form: 'signUp', key: 'password', value: '' });
      changeField({ form: 'signUp', key: 'passwordCheck', value: '' });
      return;
    }
    dispatch(signUp({ name, email, password }));
  };

  // 컴포넌트 첫 렌더링 될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm("signUp"));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        return setError('이미 존재하는 계정입니다.');
      }else {
        return setError('회원가입 실패');
      }
    }
    if (signUpSuccess) {
      console.log("회원가입 성공", auth);
      history.push('/signIn');
    }
  }, [auth, authError, history]);

  return (
    <AuthForm
      type="SignUp"
      form={form}
      onChangeInputHandler={onChangeInputHandler}
      onSubmitFormHandler={onSubmitFormHandler}
      error={error}
    />
  );
};

export default withRouter(SignUpForm);