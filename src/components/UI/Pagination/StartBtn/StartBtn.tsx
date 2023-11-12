import React from 'react';
import { API } from '../../../../constants/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentPage: number;
  className: string;
}

function StartBtn({ currentPage, className }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`?page=${API.initialPageNumber}`);
  };
  return currentPage === API.initialPageNumber ? (
    <button className={className} disabled onClick={handleClick}>
      Start
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      Start
    </button>
  );
}

export default StartBtn;
