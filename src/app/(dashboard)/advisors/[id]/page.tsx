import { getAdvisorById } from "@/lib/advisor";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import LocationIcon from "@/components/icons/LocationIcon";
import BagIcon from "@/components/icons/BagIcon";
import { Advisor } from "@/types/advisor";
import EditAdvisorModal from "@/components/advisorDetail/EditAdvisorModal/EditAdvisorModal";
import DeleteAdvisorModal from "@/components/advisorDetail/DeleteAdvisorModal/DeleteAdvisorModal";
import typography from "@/styles/typography.module.css";

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
        {advisor.avatar ? (
          <Image
            src={advisor.avatar}
            alt={advisor.name}
            width={112}
            height={112}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarFallback}>
            <span className={typography.text2Xl}>
              {advisor.name?.[0] || "N A"}
            </span>
          </div>
        )}
        <div className={styles.actionsContainer}>
          <DeleteAdvisorModal advisor={advisor} />
          <EditAdvisorModal advisor={advisor} />
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
            <span>
              {advisor[item.key]
                ? item.key === "income"
                  ? `$${advisor[item.key]}`
                  : advisor[item.key]
                : "No data"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
