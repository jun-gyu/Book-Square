import React, { useState } from "react";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";

const SignUpForm = () => {
  
  return (
    <AuthForm
      type="SignUp"
    />
  );
};

export default withRouter(SignUpForm);