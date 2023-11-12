import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentPage: number;
  lastPage: number;
  className: string;
}

function NextBtn({ currentPage, lastPage, className }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/?page=${currentPage + 1}`);
  };
  return currentPage === lastPage ? (
    <button className={className} disabled onClick={handleClick}>
      Next
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      Next
    </button>
  );
}

export default NextBtn;
