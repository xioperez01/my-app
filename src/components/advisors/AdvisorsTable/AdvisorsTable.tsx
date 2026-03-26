"use client";
import { Advisor } from "@/types/advisor";

import { useRouter } from "next/navigation";
import Table from "@/components/Table/Table";

function AdvisorsTable({ advisors }: { advisors: Advisor[] }) {
  const router = useRouter();

  const handleGoToDetail = (id: string) => {
    router.push(`/advisors/${id}`);
  };

  return (
    <Table
      data={advisors}
      columns={[
        { key: "name", label: "Advisor Name", sortable: true },
        {
          key: "income",
          label: "Income",
          sortable: true,
          render: (value) => `$${value.toLocaleString()}`,
        },
      ]}
      defaultSortKey="name"
      onRowClick={(advisor) => handleGoToDetail(advisor.id)}
      title="Advisors Found"
      dataName="Advisors"
    />
  );
}

export default AdvisorsTable;
