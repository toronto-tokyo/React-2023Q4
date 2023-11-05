import React from 'react';
import { API } from '../../../../constants/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentPage: number;
  className: string;
}

function PrevBtn({ currentPage, className }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/?page=${currentPage - 1}`);
  };
  return currentPage === API.initialPageNumber ? (
    <button className={className} disabled onClick={handleClick}>
      Prev
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      Prev
    </button>
  );
}

export default PrevBtn;
