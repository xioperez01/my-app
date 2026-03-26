import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

export const usePagination = <T>(data: T[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    if (!data?.length) return [];

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return data.slice(start, end);
  }, [data, currentPage]);

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const next = () => {
    if (hasNext) setCurrentPage((p) => p + 1);
  };

  const prev = () => {
    if (hasPrev) setCurrentPage((p) => p - 1);
  };

  const label = useMemo(() => {
    if (!totalItems) return "0 of 0";

    const start = (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, totalItems);

    return `${start}-${end} of ${totalItems}`;
  }, [currentPage, totalItems]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    hasNext,
    hasPrev,
    next,
    prev,
    label,
  };
};
