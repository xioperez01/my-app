import { getAdvisorById } from "@/lib/advisor";
import { notFound } from "next/navigation";

export default async function AdvisorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const advisor = await getAdvisorById(id);
  if (!advisor) {
    notFound();
  }

  return <div>Advisor: {advisor.name}</div>;
}
