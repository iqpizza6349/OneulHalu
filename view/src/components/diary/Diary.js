import React from 'react';
import NewDiary from './NewDiary';

const Diary = () => {
  const location = window.location;

  const getDate = () => {
    const params = new URLSearchParams(location.search);

    let year = params.get("year");
    let month = params.get("month");
    let day = params.get("date");
    return new Date(year, month - 1, day);
  };

  return (
    <NewDiary date={getDate()}/>
  );
};

export default Diary;
