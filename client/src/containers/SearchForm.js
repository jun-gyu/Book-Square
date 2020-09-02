import React, { useState } from 'react';
import styled from 'styled-components';
import SearchPageAni from "../components/SearchPageAni";
import searchIMG from '../images/searchIMG.png';
import axios from "axios";
import { KAKAO_API_KEY } from "../kakaoAPI";
import SearchBookList from '../components/SearchBookList';
import { v4 as uuidv4 } from "uuid";

const SearchFormWrapper = styled.div`
  width: 90%;
  margin:4% auto 0;
  & > form {
    position: relative;
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
    & > .searchIMG {
      position: absolute;
      top: 50%;
      left: 2%;
      transform: translateY(-50%);
      width: 25px;
      height: 25px;
      background: url(${searchIMG}) no-repeat 50% 50% / 100% 100%;
      font-size: 0;
      border: 0;
      outline: none;
      cursor: pointer;
    }
    & > .removeBtn {
      position: absolute;
      top: 50%;
      right: 3%;
      transform: translateY(-50%);
      width: 25px;
      height: 25px;
      background: #efefef;
      border-radius: 50%;
      border: 0;
      outline: none;
      font-size: 0;
      &::after, &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60%;
        height: 2px;
        background: #ffffff;
      }
      &::after {transform: translate(-50%, -50%) rotate(45deg)}
      &::before {transform: translate(-50%, -50%) rotate(-45deg)}
    }
  }
  & > section {
    width: 100%;
    height: 650Px;
    overflow-y: auto;
    margin-top: 3%;
  }
`;

const SearchForm = () => {

  const [showRemoveBtn, setShowRemoveBtn] = useState(false);
  const [searchBookLists, setSearchBookLists] = useState([]);
  const [checkInSearch, setCheckInSearch] = useState(false);

  const callApi = (input) => {
    axios
      .get(`https://dapi.kakao.com/v3/search/book?`, {
        params: {
          query: input,
          size: 30,
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`, // 공통으로 요청 할 헤더
        },
      })
      .then((res) => kakaoBookFilterFunc(res.data.documents))
      .then((data) => setSearchBookLists(data))
      .catch((err) => console.log(err));
  };

  const kakaoBookFilterFunc = (data) => {
    for (let i = 0; i < data.length; i++) {
      data[i] = {
        bookAuthor: data[i].authors[0],
        bookContent: data[i].contents,
        bookImage: data[i].thumbnail,
        bookTitle: data[i].title,
      };
    }
    return data;
  };

  const setQuery = (e) => {
    if(e.target.value !== ""){
      if (e.key === "Enter") {
        e.preventDefault();
        callApi(e.target.value);
        setCheckInSearch(true);
      }
    }
  };

  const showRemoveBtnFunc = (e) => {
    e.target.value.length > 0 ? setShowRemoveBtn(true) : setShowRemoveBtn(false);
  }

  const removeInputValue = (e) => {
    e.preventDefault();
    document.querySelector('.searchBookInput').value = "";
  }

  return (
    <SearchFormWrapper>
      <form onKeyPress={(e) => setQuery(e)}>
        <span className="searchIMG">search</span>
        <input
          className="searchBookInput"
          type="text"
          placeholder="검색어를 입력하세요."
          onChange={(e) => showRemoveBtnFunc(e)}
        />
        {showRemoveBtn && (
          <button
            className="removeBtn"
            onClick={(e) => removeInputValue(e)}
            type="button"
          >
            remove
          </button>
        )}
      </form>
      <section>
        {checkInSearch ? (
          searchBookLists.map((bookList) => (
            <SearchBookList bookList={bookList} key={uuidv4()} />
          ))
        ) : (
          <SearchPageAni />
        )}
      </section>
    </SearchFormWrapper>
  );
};

export default SearchForm;