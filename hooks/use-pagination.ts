// import { useState } from "react";

// interface UsePaginationOptions {
//     initialPage?: number;
//     initialLimit?: number;
// }

// export function usePagination(options: UsePaginationOptions = {}) {
//     const { initialPage = 1, initialLimit = 10 } = options;
//     const [page, setPage] = useState(initialPage);
//     const [limit, _setLimit] = useState(initialLimit);

//     const setLimit = (newLimit: number) => {
//         _setLimit(newLimit);
//         setPage(1);
//     };

//     const resetPage = () => setPage(1);

//     return {
//         page,
//         setPage,
//         limit,
//         setLimit,
//         resetPage,
//     };
// }

import { useState } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  limits?: number[];
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { initialPage = 1, initialLimit = 10, limits = [5, 10, 15, 20] } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);

  const setLimit = (newLimit: number) => {
    setLimitState(newLimit);
    setPage(1);
  };

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const resetPage = () => setPage(1);

  return {
    page,
    limit,
    limits,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    resetPage,
  };
}
