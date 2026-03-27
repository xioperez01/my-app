"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import { buildSearchParams, cn } from "@/utils";
import typography from "@/styles/typography.module.css";
import { Button } from "@/components/ui/Button/Button";
import UserIcon from "@/components/icons/UserIcon";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const [validation, setValidation] = useState<string | undefined>();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (validation) {
      setValidation(undefined);
    }
  };
  const handleSearch = () => {
    const inputValue = search.trim();
    if (inputValue?.length !== 5) {
      setValidation("5 digits are the required ");
      return;
    }

    const currentParams = new URLSearchParams(searchParams.toString());
    const query = buildSearchParams(currentParams, { income: Number(search) });

    router.push(`/advisors?${query}`);
  };

  return (
    <div className={styles.page}>
      <img src="/ZoeLogo.svg" alt="Zoe logo" className={styles.logo} />
      <div className={styles.iconContainer}>
        <UserIcon />
      </div>
      <div className={styles.titleContainer}>
        <p className={cn(typography.textXl, typography.textHeader)}>
          Find Your Company Advisors!
        </p>
        <p className={typography.textHeader}>
          Search by income to find your advisors.
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="search" className={typography.textSm}>
          Current income
        </label>

        <div className={styles.inputWrapper}>
          <span className={styles.prefix}>$</span>
          <input
            type="number"
            title="Search by income"
            value={search}
            onChange={(event) => handleOnChange(event)}
            className={styles.inputSearch}
          />
        </div>
        {validation && (
          <p className={cn(typography.textSm, typography.textDanger)}>
            {validation}
          </p>
        )}
      </div>
      <Button
        onClick={() => handleSearch()}
        rightIcon={<img src="/icons/SearchIcon.svg" alt="" />}
      >
        Search Now
      </Button>
    </div>
  );
}
