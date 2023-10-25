import React, { useState } from 'react';

const usePagination = (items, customItemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = customItemsPerPage || 1; 
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = items.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentPage,
    totalPages,
    handlePageChange,
    currentProducts,
    itemsPerPage,
  };
};

export default usePagination;
