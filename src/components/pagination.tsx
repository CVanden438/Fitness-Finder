import React from "react";

interface paginationProps {
  handlePageChange: (direction: number) => void;
  count?: number;
  page?: number;
  LIMIT: number;
}
const Pagination: React.FC<paginationProps> = ({
  handlePageChange,
  count,
  page,
  LIMIT,
}) => {
  return (
    <div className="flex justify-center gap-4 pb-4">
      <button
        className="rounded-lg bg-slate-400 pr-2 pl-2"
        onClick={() => handlePageChange(1)}
      >
        Prev Page
      </button>
      <p className="">
        {page ? page : 1}/{count ? Math.ceil(count / LIMIT) : 1}
      </p>
      <button
        className="rounded-lg bg-slate-400 pr-2 pl-2"
        onClick={() => handlePageChange(0)}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
