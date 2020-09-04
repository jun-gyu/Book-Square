/* eslint no-restricted-globals: ["off"] */
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";

const SignInForm = ({ history }) => {

  return (
    <AuthForm
      type="SignIn"
    />
  );
};

export default withRouter(SignInForm);
