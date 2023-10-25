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

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`border border-gray-300 px-3 py-1 mx-1 rounded-md ${
          i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="text-center mt-4">
      {pagination}
    </div>
  );
};

export { usePagination, Pagination };
