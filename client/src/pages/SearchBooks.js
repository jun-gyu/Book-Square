import React from 'react';
import MainTemplate from "../components/MainTemplate";
import SearchForm from '../containers/SearchForm';

const SearchBooks = () => {
  return (
    <MainTemplate>
      <SearchForm/>
    </MainTemplate>
  );
};

export default SearchBooks;