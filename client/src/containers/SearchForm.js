import React from 'react';
import styled from 'styled-components';
import SearchPageAni from "../components/SearchPageAni";
import searchIMG from '../images/searchIMG.png';

const SearchFormWrapper = styled.div`
  & > form {
    position: relative;
    width: 80%;
    height: 80px;
    margin: 4% auto 0;
    & > .searchBookInput {
      border: 0;
      outline: none;
      margin: 0 auto;
      display: block;
      /* border-bottom: 1px solid #ddd; */
      width: 100%;
      padding: 1% 7%;
      font-size: 18px;
      box-shadow: 0 0 15px rgba(0,0,0,0.07);
      border-radius: 10px;
      &::placeholder {
        color: #dddddd
      }
    }
    & > button {
      position: absolute;
      top: 14%;
      left: 2%;
      width: 25px;
      height: 25px;
      background: url(${searchIMG}) no-repeat 50% 50% / 100% 100%;
      font-size: 0;
      border: 0;
      outline: none;
      cursor: pointer;
    }
  }
`;

const SearchForm = () => {


  return (
    <SearchFormWrapper>
      <form>
        <button>search</button>
        <input className="searchBookInput" type="text" placeholder="검색어를 입력하세요." />
      </form>
      
      <SearchPageAni />
    </SearchFormWrapper>
  );
};

export default SearchForm;