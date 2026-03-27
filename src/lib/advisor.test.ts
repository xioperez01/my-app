import {
  getAdvisors,
  getAdvisorById,
  updateAdvisor,
  deleteAdvisor,
  createAdvisor,
} from "@/lib/advisor";
import type { Advisor, CreateAdvisorDTO } from "@/types/advisor";

const baseAdvisor: Advisor = {
  id: "1",
  name: "Ana Perez",
  income: 50000,
  address: "Street 1",
  avatar: "",
  email: "ana@mail.com",
  phone: "123456",
};

describe("advisor api", () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    Object.defineProperty(global, "fetch", {
      value: fetchMock,
      writable: true,
    });
  });

  it("throws when income is not numeric", async () => {
    await expect(getAdvisors("abc")).rejects.toThrow("Invalid income value");
  });

  it("filters advisors by +-10000 income range", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        { ...baseAdvisor, id: "1", income: 50000 },
        { ...baseAdvisor, id: "2", income: 61500 },
        { ...baseAdvisor, id: "3", income: 75000 },
      ],
    } as Response);

    const result = await getAdvisors("52000");

    expect(result.map((a) => a.id)).toEqual(["1", "2"]);
  });

  it("returns null when advisor is not found", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(getAdvisorById("404")).resolves.toBeNull();
  });

  it("throws when getAdvisorById fails with non-404", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(getAdvisorById("1")).rejects.toThrow(
      "Failed to fetch advisor: 500",
    );
  });

  it("sends transformed payload when creating advisor", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => baseAdvisor,
    } as Response);

    const payload: Partial<CreateAdvisorDTO> = {
      firstName: "Ana",
      lastName: "Perez",
      email: "ana@mail.com",
      income: 50000,
      address: "Street 1",
      phone: "123456",
      avatar: "",
    };

    await createAdvisor(payload);

    const [, requestInit] = fetchMock.mock.calls[0];
    expect((requestInit as RequestInit).method).toBe("POST");
    expect((requestInit as RequestInit).body).toContain('"name":"Ana Perez"');
    expect((requestInit as RequestInit).body).not.toContain("firstName");
    expect((requestInit as RequestInit).body).not.toContain("lastName");
  });

  it("throws when update is called without id", async () => {
    await expect(updateAdvisor("", {})).rejects.toThrow(
      "Advisor id is required",
    );
  });

  it("throws when delete is called without id", async () => {
    await expect(deleteAdvisor("")).rejects.toThrow("Advisor id is required");
  });
});
