import { CreateAdvisorDTO } from "@/types/advisor";

type FormErrors<T> = Partial<Record<keyof T, string>>;

const validateAdvisor = (
  form: Partial<CreateAdvisorDTO>,
  schema: { key: keyof CreateAdvisorDTO; required?: boolean }[],
): FormErrors<CreateAdvisorDTO> => {
  const errors: FormErrors<CreateAdvisorDTO> = {};

  schema.forEach(({ key, required }) => {
    const value = form[key];

    if (required && (!value || value === "")) {
      errors[key] = "This field is required";
      return;
    }

    if (key === "email" && value) {
      if (!String(value).includes("@")) {
        errors[key] = "Invalid email";
      }
    }

    if (key === "income" && value) {
      if (isNaN(Number(value))) {
        errors[key] = "Must be a number";
      }
    }
  });

  return errors;
};

export { validateAdvisor };
