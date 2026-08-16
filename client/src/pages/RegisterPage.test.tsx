import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import RegisterPage from "./RegisterPage";

const { toast } = vi.hoisted(() => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("sonner", () => ({ toast }));

describe("Registration reference implementation interactions", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "hasPointerCapture", { configurable: true, value: () => false });
    Object.defineProperty(HTMLElement.prototype, "setPointerCapture", { configurable: true, value: () => undefined });
    Object.defineProperty(HTMLElement.prototype, "releasePointerCapture", { configurable: true, value: () => undefined });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: () => undefined });
    toast.error.mockReset();
    toast.success.mockReset();
    window.localStorage.clear();
    window.history.replaceState({}, "", "/register");
  });

  it("validates missing required fields, toggles password visibility, updates role selection, submits complete details, and opens sign in", async () => {
    const user = userEvent.setup();
    render(<ThemeProvider defaultTheme="dark"><RegisterPage /></ThemeProvider>);

    const themeToggle = screen.getByRole("button", { name: "Switch to light mode" });
    await user.click(themeToggle);
    expect(document.documentElement.dataset.segTheme).toBe("light");

    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(toast.error).toHaveBeenCalledWith("Please complete the required registration details.");

    const password = screen.getByPlaceholderText("Password") as HTMLInputElement;
    expect(password.type).toBe("password");
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(password.type).toBe("text");

    const professionalRole = screen.getByRole("combobox", { name: "Professional role" }) as HTMLSelectElement;
    fireEvent.change(professionalRole, { target: { value: "Critical care" } });
    expect(professionalRole.value).toBe("Critical care");

    const country = screen.getByRole("combobox", { name: "Country" });
    expect(country.textContent).toContain("Jordan");
    await user.click(country);
    expect(screen.getByRole("option", { name: "Saudi Arabia" })).toBeTruthy();
    await user.click(screen.getByRole("option", { name: "Saudi Arabia" }));
    expect(country.textContent).toContain("Saudi Arabia");

    const graduationYear = screen.getByRole("combobox", { name: "Graduation year" });
    expect(graduationYear.textContent).toContain("2015");
    await user.click(graduationYear);
    expect(screen.getByRole("option", { name: "2015" })).toBeTruthy();
    await user.click(screen.getByRole("option", { name: "2015" }));
    expect(graduationYear.textContent).toContain("2015");

    await user.type(screen.getByPlaceholderText("Full Name"), "Dr Samir Al-Haddad");
    await user.type(screen.getByPlaceholderText("Email Address"), "samir@example.test");
    await user.type(password, "SEG2026!");
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(toast.success).toHaveBeenCalledWith("Your SEG learning profile is ready to continue.");
    expect(screen.getByRole("status").textContent).toContain("Profile details captured locally");

    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(window.location.pathname).toBe("/login");
  });
});
