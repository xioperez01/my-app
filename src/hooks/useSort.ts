import { useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

export const useSort = <T>(
  data: T[],
  initialKey: keyof T,
  initialOrder: SortOrder = "asc",
) => {
  const [sortKey, setSortKey] = useState<keyof T>(initialKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder);

  const sortedData = useMemo(() => {
    if (!data?.length) return [];

    return data?.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const handleSort = (key: keyof T) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return {
    sortKey,
    sortOrder,
    sortedData,
    handleSort,
  };
};
