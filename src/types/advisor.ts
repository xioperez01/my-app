interface Advisor {
  id: string;
  name: string;
  income: number;
  address: string;
  avatar: string;
  email: string;
  phone: string;
  idNumber?: string;
  education?: string;
  experienceYears?: string;
  title?: string;
}

interface CreateAdvisorDTO extends Omit<Advisor, "id" | "name"> {
  firstName: string;
  lastName: string;
}

export type { Advisor, CreateAdvisorDTO };
