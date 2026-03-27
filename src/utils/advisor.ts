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

    if (key === "income") {
      const stringValue = String(value);

      if (!stringValue) {
        errors[key] = "Income is required";
      } else if (stringValue.length !== 5) {
        errors[key] = "Income must be exactly 5 digits";
      }
    }
  });

  return errors;
};

export { validateAdvisor };
