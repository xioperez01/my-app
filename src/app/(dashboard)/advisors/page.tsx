import AdvisorsTable from "@/components/advisors/AdvisorsTable";
import { getAdvisors } from "@/lib/advisor";

export default async function AdvisorsPage({
  searchParams,
}: {
  searchParams: Promise<{ income: string }>;
}) {
  const { income } = await searchParams;
  const advisors = await getAdvisors(income);

  if (!advisors?.length) {
    return (
      <p>
        No available Advisors based on the provided income. Please try a
        different income value.
      </p>
    );
  }

  return <AdvisorsTable advisors={advisors} />;
}
