"use client";
import { Advisor } from "@/types/advisor";
import Paginator from "@/components/Paginator";
import { useTableState } from "@/hooks/useTable";
import { useRouter } from "next/navigation";

function AdvisorsTable({ advisors }: { advisors: Advisor[] }) {
  const router = useRouter();

  const {
    data,
    sortKey,
    sortOrder,
    handleSort,
    currentPage,
    next,
    prev,
    hasNext,
    hasPrev,
    label,
  } = useTableState(advisors, "name");

  const handleGoToDetail = (id: string) => {
    router.push(`/advisors/${id}`);
  };
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
          {data?.map((advisor) => (
            <tr key={advisor?.id} onClick={() => handleGoToDetail(advisor?.id)}>
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
