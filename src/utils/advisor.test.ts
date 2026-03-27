import { validateAdvisor } from "@/utils/advisor";
import type { CreateAdvisorDTO } from "@/types/advisor";

const schema: { key: keyof CreateAdvisorDTO; required?: boolean }[] = [
  { key: "firstName", required: true },
  { key: "lastName", required: true },
  { key: "email", required: true },
  { key: "income", required: true },
];

describe("validateAdvisor", () => {
  it("returns required errors when required fields are empty", () => {
    const errors = validateAdvisor({}, schema);

    expect(errors.firstName).toBe("This field is required");
    expect(errors.lastName).toBe("This field is required");
    expect(errors.email).toBe("This field is required");
    expect(errors.income).toBe("This field is required");
  });

  it("returns invalid email for malformed email", () => {
    const errors = validateAdvisor(
      {
        firstName: "Ana",
        lastName: "Perez",
        email: "invalid-email",
        income: 12345,
      },
      schema,
    );

    expect(errors.email).toBe("Invalid email");
  });

  it("validates income must be exactly 5 digits", () => {
    const errors = validateAdvisor(
      {
        firstName: "Ana",
        lastName: "Perez",
        email: "ana@mail.com",
        income: 1234,
      },
      schema,
    );

    expect(errors.income).toBe("Income must be exactly 5 digits");
  });

  it("returns no errors for valid form", () => {
    const errors = validateAdvisor(
      {
        firstName: "Ana",
        lastName: "Perez",
        email: "ana@mail.com",
        income: 54321,
      },
      schema,
    );

    expect(errors).toEqual({});
  });
});
