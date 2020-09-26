import React from 'react';
import MainTemplate from '../components/MainTemplate';
import MainPageCarousel from '../components/MainPageCarousel';
import MainPageBestSeller from "../containers/MainPageBestSeller";

const MainPage = () => {

  return (
    <MainTemplate>
      <MainPageCarousel />
      <MainPageBestSeller />
    </MainTemplate>
  );
};

export default MainPage;