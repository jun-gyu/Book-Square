import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { categorySearch } from "../lib/commonAPI";
import { BESTSELLER_API_KEY } from "../REST_API_KEY";
import axios from 'axios';

const MainPageBestSellerWrapper = styled.div`
  height: 300px;
  padding-left: 20px;
  nav {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    & > strong,
    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > strong {
      font-size: 18px;
    }
    & > button {
      border: none;
      background: none;
      outline: none;
      border-radius: 20px;
      cursor: pointer;
      width: 150px;
      color: #61677c;
      box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
      transition: all 0.2s ease-in-out;
      font-weight: 600;
      font-size: 18px;
      &:hover {
        box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
      }
    }
  }
  & > div {
    width: 100%;
    height: 80%;
    margin-top: 20px;
  }
`;

const MainPageBestSeller = () => {

  const [xmlData, setXmlData] = useState(null);

  // useEffect(() => {
  //   bestSeller(BESTSELLER_API_KEY);
  // });

  const XMLParser = require("react-xml-parser");
  // const xml = new XMLParser().parseFromString(xmlText);  

  const categorySearchHandler = (text) => {
    if (text === "소설") {
      categorySearch(100).then((data) => console.log(data));
    } else if (text === "판타지") {
      categorySearch(100030010).then((data) => console.log(data));
    } else if (text === "요리") {
      categorySearch(130050).then((data) => console.log(data));
    } else if (text === "여행") {
      categorySearch(120020).then((data) => console.log(data));
    }
  }

  return (
    <MainPageBestSellerWrapper>
      <nav>
        <strong>카테고리</strong>
        <button onClick={() => categorySearchHandler("소설")}>소설</button>
        <button onClick={() => categorySearchHandler("판타지")}>SF/판타지</button>
        <button onClick={() => categorySearchHandler("요리")}>요리</button>
        <button onClick={() => categorySearchHandler("여행")}>취미/여행</button>
      </nav>
      <div>sdf</div>
    </MainPageBestSellerWrapper>
  );
};

export default MainPageBestSeller;