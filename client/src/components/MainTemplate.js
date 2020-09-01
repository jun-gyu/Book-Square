import React from "react";
import HeaderNav from './common/HeaderNav';

const MainTemplate = ({ children }) => {
 
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
};

export default MainTemplate;
