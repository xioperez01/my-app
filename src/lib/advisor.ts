import { Advisor, CreateAdvisorDTO } from "@/types/advisor";

const BASE_URL = "http://localhost:3001";
const RANGE = 10000;

const getAdvisors = async (income: string): Promise<Advisor[]> => {
  const incomeNumber = Number(income);

  if (isNaN(incomeNumber)) {
    throw new Error("Invalid income value");
  }

  const res = await fetch(`${BASE_URL}/advisor`);

  if (!res.ok) {
    throw new Error(`Failed to fetch advisors: ${res.status}`);
  }

  const fullData: Advisor[] = await res.json();

  const min = incomeNumber - RANGE;
  const max = incomeNumber + RANGE;

  return fullData.filter(
    (advisor) => advisor.income >= min && advisor.income <= max,
  );
};

const getAdvisorById = async (id: string): Promise<Advisor | null> => {
  const res = await fetch(`${BASE_URL}/advisor/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch advisor: ${res.status}`);
  }

  return res.json();
};

const buildPayload = (data: CreateAdvisorDTO) => {
  const { firstName, lastName, ...rest } = data;

  return {
    ...rest,
    name: `${firstName} ${lastName}`.trim(),
  };
};

const updateAdvisor = async (
  id: string,
  data: Partial<CreateAdvisorDTO> & {
    avatarFile?: File | null;
    avatarPreview?: string | null;
    removeAvatar?: boolean;
  },
): Promise<Advisor> => {
  if (!id) {
    throw new Error("Advisor id is required");
  }

  // It's necessary to handle avatar separately because it needs to be sent as FormData

  const clearData = { ...data };
  delete clearData.avatarPreview;
  delete clearData.removeAvatar;

  const payload = buildPayload(clearData as CreateAdvisorDTO);

  const res = await fetch(`${BASE_URL}/advisor/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update advisor");
  }

  return res.json();
};

export { getAdvisors, getAdvisorById, updateAdvisor };
