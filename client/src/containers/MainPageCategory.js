import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { categorySearch } from "../lib/commonAPI";
import CategorySearchBook from '../components/CategorySearchBook';
import { v4 as uuidv4 } from "uuid";

const MainPageCategoryWrapper = styled.div`
  height: 300px;
  padding-left: 20px;
  margin-top: 50px;
  & > strong {
    font-size: 24px;
    display: block;
    margin-bottom: 20px;
    text-align: center;
  }
  nav {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    /* & > strong,
    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
    } */
    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
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
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
`;

const MainPageCategory = () => {

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    categorySearch(100).then((data) => setCategoryData(data.data.rss.channel[0].item));
  }, []);

  const categorySearchHandler = (text) => {
    if (text === "소설") {
      categorySearch(100).then((data) => setCategoryData(data.data.rss.channel[0].item));
    } else if (text === "경제") {
      categorySearch(160010).then((data) =>
        setCategoryData(data.data.rss.channel[0].item)
      );
    } else if (text === "요리") {
      categorySearch(130050).then((data) => setCategoryData(data.data.rss.channel[0].item));
    } else if (text === "심리") {
      categorySearch(120020).then((data) => setCategoryData(data.data.rss.channel[0].item));
    }
  }

  return (
    <MainPageCategoryWrapper>
      <strong>카테고리</strong>
      <nav>
        <button onClick={() => categorySearchHandler("소설")}>소설</button>
        <button onClick={() => categorySearchHandler("경제")}>경제</button>
        <button onClick={() => categorySearchHandler("요리")}>요리</button>
        <button onClick={() => categorySearchHandler("심리")}>심리</button>
      </nav>
      {categoryData && (
        <div>
          {categoryData.map((data) => (
            <CategorySearchBook data={data} key={uuidv4()} />
          ))}
        </div>
      )}
    </MainPageCategoryWrapper>
  );
};

export default MainPageCategory;