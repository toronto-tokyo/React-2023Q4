import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentPage: number;
  lastPage: number;
  className: string;
}

function EndBtn({ currentPage, lastPage, className }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/?page=${lastPage}`);
  };
  return currentPage === lastPage ? (
    <button className={className} disabled onClick={handleClick}>
      End
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      End
    </button>
  );
}

export default EndBtn;
