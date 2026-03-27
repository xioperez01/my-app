import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvisorModal from "./EditAdvisorModal";
import type { Advisor } from "@/types/advisor";

const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
    push: jest.fn(),
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

const updateAdvisorMock = jest.fn();

jest.mock("@/lib/advisor", () => ({
  createAdvisor: jest.fn(),
  updateAdvisor: (...args: unknown[]) => updateAdvisorMock(...args),
}));

describe("AdvisorModal edit flow", () => {
  it("opens in edit mode and submits changes", async () => {
    const advisor: Advisor = {
      id: "1",
      name: "Ana Perez",
      income: 50000,
      address: "Street 1",
      avatar: "",
      email: "ana@mail.com",
      phone: "12345",
    };

    updateAdvisorMock.mockResolvedValue(advisor);

    render(<AdvisorModal advisor={advisor} />);

    await userEvent.click(
      screen.getByRole("button", { name: /edit advisor/i }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    await waitFor(() => {
      expect(updateAdvisorMock).toHaveBeenCalledWith("1", expect.any(Object));
      expect(refreshMock).toHaveBeenCalled();
    });
  });
});
