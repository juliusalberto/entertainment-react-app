import React, { useState } from 'react';
import searchImage from "../../assets/icon-search.svg"

export default function SearchBar(props) {
  const [searchState, setSearchState] = useState('empty');

  const {searchTerm, onChange} = props;

  const handleFocus = () => {
    setSearchState('active');
  };

  const handleBlur = () => {
    if (searchTerm === '') {
      setSearchState('empty');
    } else {
      setSearchState('filled');
    }
  };

  const handleChange = (e) => {
    if (e.target.value === '') {
      setSearchState('active');
    } else {
      setSearchState('filled');
    }
  };

  return (
    <div className="flex items-center flex-row gap-4 px-4 bg-very-dark-blue text-white max-h-24 font-outfit">
      <img src={searchImage} alt="" srcset="" />
      <input
        type="text"
        className={`bg-transparent outline-none w-full ${searchState === 'empty' ? 'opacity-50' : 'opacity-100'}`}
        placeholder={searchState === 'empty' ? 'Search for movies or TV series' : ''}
        value={searchTerm}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(event) => {
          handleChange(event)
          onChange(event.target.value)
        }}
      />
    </div>
  );
};
