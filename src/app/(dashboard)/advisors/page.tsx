import AdvisorsEmpty from "@/components/advisors/AdvisorsEmpty/AdvisorsEmpty";
import AdvisorsTable from "@/components/advisors/AdvisorsTable/AdvisorsTable";
import { getAdvisors } from "@/lib/advisor";
import styles from "./page.module.css";

import EditAdvisorModal from "@/components/advisorDetail/EditAdvisorModal/EditAdvisorModal";

export default async function AdvisorsPage({
  searchParams,
}: {
  searchParams: Promise<{ income: string }>;
}) {
  const { income } = await searchParams;
  const advisors = await getAdvisors(income);

  if (!advisors?.length) {
    return <AdvisorsEmpty />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>Advisors</h1>
        <EditAdvisorModal />
      </div>
      <AdvisorsTable advisors={advisors} />
    </div>
  );
}
