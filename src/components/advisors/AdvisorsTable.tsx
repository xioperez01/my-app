"use client";
import { useSort } from "@/hooks/useSort";
import { Advisor } from "@/types/advisor";

function AdvisorsTable({ advisors }: { advisors: Advisor[] }) {
  const { sortedData, handleSort, sortKey, sortOrder } = useSort(
    advisors,
    "name",
  );

  return (
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
        {sortedData?.map((advisor) => (
          <tr key={advisor?.id}>
            <td>{advisor?.name}</td>
            <td>${advisor?.income}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdvisorsTable;
