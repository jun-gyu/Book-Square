import React from 'react';
import MainTemplate from '../components/MainTemplate';
import MainPageCarousel from '../components/MainPageCarousel';
import MainPageCategory from "../containers/MainPageCategory";

const MainPage = () => {

  return (
    <MainTemplate>
      <MainPageCarousel />
      <MainPageCategory />
    </MainTemplate>
  );
};

export default MainPage;