import React, { useState, useCallback } from 'react';
import MainTemplate from "../components/MainTemplate";
import SignUpForm from '../containers/SignUpForm';

// 커스텀 훅
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const SignUp = () => {

  return (
    <MainTemplate>
      <SignUpForm/>
    </MainTemplate>
  );
};

export default SignUp;