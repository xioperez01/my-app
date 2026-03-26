import { getAdvisorById } from "@/lib/advisor";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import LocationIcon from "@/components/icons/LocationIcon";
import BagIcon from "@/components/icons/BagIcon";
import { Advisor } from "@/types/advisor";

const dataToDisplay: { key: keyof Advisor; label: string }[] = [
  { key: "idNumber", label: "ID Number" },
  { key: "email", label: "Email" },
  { key: "income", label: "Income" },
  { key: "education", label: "Education" },
  { key: "title", label: "Title" },
  { key: "experienceYears", label: "Years of Experience" },
];

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

  return (
    <div className={styles.root}>
      <div className={styles.topContainer}>
        <Image
          src={advisor.avatar}
          alt={advisor.name}
          width={112}
          height={112}
          className={styles.avatar}
        />
        <div className={styles.actionsContainer}>
          <Button colorScheme="danger">Delete</Button>
          <Button variant="outline" colorScheme="primary">
            Edit Advisor
          </Button>
        </div>
      </div>
      <div className={styles.primaryInfoContainer}>
        <h1>{advisor.name}</h1>
        <div className={styles.rowContainer}>
          <LocationIcon />
          <span>{advisor.address}</span>
        </div>
        <div className={styles.rowContainer}>
          <BagIcon />
          <span>Zoe Advisors</span>
        </div>
      </div>
      <hr />
      <div className={styles.dataContainer}>
        {dataToDisplay.map((item) => (
          <div key={item.key}>
            <span>{item.label}: </span>
            <span>{advisor[item.key] || "No data"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
