"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SortOrder = "asc" | "desc";

type SortState<T> = {
  label: keyof T;
  value: SortOrder;
};

const PAGE_SIZE = 10;

export const useTableState = <T>(
  data: T[],
  initialSortKey: keyof T,
  initialOrder: SortOrder = "asc",
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialSort = (): SortState<T> => {
    const param = searchParams.get("sort");
    if (!param) return { label: initialSortKey, value: initialOrder };

    try {
      return JSON.parse(param);
    } catch {
      return { label: initialSortKey, value: initialOrder };
    }
  };

  const getInitialPage = () => {
    const page = Number(searchParams.get("page"));
    return page && page > 0 ? page : 1;
  };

  const [sort, setSort] = useState<SortState<T>>(getInitialSort);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  const sortedData = useMemo(() => {
    if (!data.length) return [];

    return data?.sort((a, b) => {
      const aValue = a[sort.label];
      const bValue = b[sort.label];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.value === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [data, sort]);

  const handleSort = useCallback((key: keyof T) => {
    setSort((prev) => {
      if (prev.label === key) {
        return {
          label: key,
          value: prev.value === "asc" ? "desc" : "asc",
        };
      }

      return {
        label: key,
        value: "asc",
      };
    });

    setCurrentPage(1);
  }, []);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    if (!sortedData.length) return [];

    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, currentPage]);

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const next = useCallback(() => {
    setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  const label = useMemo(() => {
    if (!totalItems) return "0 of 0";

    const start = (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, totalItems);

    return `${start}-${end} of ${totalItems}`;
  }, [currentPage, totalItems]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(currentPage));
    params.set("sort", JSON.stringify(sort));

    router.replace(`?${params.toString()}`);
  }, [currentPage, sort]);

  return {
    data: paginatedData,

    sortKey: sort.label,
    sortOrder: sort.value,
    handleSort,

    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    next,
    prev,
    label,
  };
};
