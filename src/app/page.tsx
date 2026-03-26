"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import { buildSearchParams } from "@/utils";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const [validation, setValidation] = useState<string | undefined>();

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
      <input
        type="number"
        placeholder="Enter a 5-digit number..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {validation && <p>{validation}</p>}
      <button onClick={() => handleSearch()}>Search</button>
    </div>
  );
}
