// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "./DashboardLayout";

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ loading: false, user: { id: 1 }, logout: vi.fn() }),
}));

vi.mock("@/components/SEGBrand", () => ({
  SEGBrand: () => <span>SEG</span>,
}));

vi.mock("wouter", () => ({
  useLocation: () => ["/dashboard", vi.fn()],
}));

describe("DashboardLayout reference-parity rail", () => {
  it("renders the functional Dark Mode control without creating another route", () => {
    render(<ThemeProvider defaultTheme="dark"><DashboardLayout><div>Dashboard content</div></DashboardLayout></ThemeProvider>);

    expect(screen.getByText("Dark Mode")).not.toBeNull();
    expect(screen.getAllByLabelText("Switch to light mode")).toHaveLength(2);
    expect(screen.getByText("My Account")).not.toBeNull();
  });

  it("uses the existing anchor navigation and exposes concise transition feedback", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });
    render(<ThemeProvider defaultTheme="dark"><DashboardLayout><section id="learn">Learn content</section></DashboardLayout></ThemeProvider>);

    await user.click(screen.getAllByRole("button", { name: "Learn" })[0]);

    expect(scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: "start" }));
    expect(screen.getByText("Opening Learn")).not.toBeNull();
  });
});
