import { Advisor } from "@/types/advisor";

const BASE_URL = "http://localhost:3001";
const RANGE = 10000;

const getAdvisors = async (income: string): Promise<Advisor[]> => {
  const incomeNumber = Number(income);

  if (isNaN(incomeNumber)) {
    throw new Error("Invalid income value");
  }

  const res = await fetch(`${BASE_URL}/advisor`);

  if (!res.ok) {
    throw new Error("Failed to fetch advisors");
  }

  const fullData: Advisor[] = await res.json();

  const min = incomeNumber - RANGE;
  const max = incomeNumber + RANGE;

  return fullData.filter(
    (advisor) => advisor.income >= min && advisor.income <= max,
  );
};

export { getAdvisors };
