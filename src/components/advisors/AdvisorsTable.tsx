"use client";
import { usePagination } from "@/hooks/usePagination";
import { useSort } from "@/hooks/useSort";
import { Advisor } from "@/types/advisor";
import Paginator from "@/components/Paginator";

function AdvisorsTable({ advisors }: { advisors: Advisor[] }) {
  const { sortedData, handleSort, sortKey, sortOrder } = useSort(
    advisors,
    "name",
  );

  const { paginatedData, currentPage, next, prev, hasNext, hasPrev, label } =
    usePagination<Advisor>(sortedData);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortKey === "name" ? sortOrder : ""}
            </th>
            <th onClick={() => handleSort("income")}>
              Income {sortKey === "income" ? sortOrder : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((advisor) => (
            <tr key={advisor?.id}>
              <td>{advisor?.name}</td>
              <td>${advisor?.income}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator
        currentPage={currentPage}
        next={next}
        prev={prev}
        hasNext={hasNext}
        hasPrev={hasPrev}
        label={label}
      />
    </div>
  );
}

export default AdvisorsTable;
