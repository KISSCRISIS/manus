import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LoginPage from "./LoginPage";

const { startLogin, toast } = vi.hoisted(() => ({
  startLogin: vi.fn(),
  toast: { info: vi.fn() },
}));

vi.mock("@/const", () => ({ startLogin }));
vi.mock("sonner", () => ({ toast }));

describe("Login final reference implementation interactions", () => {
  beforeEach(() => {
    startLogin.mockReset();
    toast.info.mockReset();
    window.localStorage.clear();
    window.history.replaceState({}, "", "/login");
  });

  it("keeps the approved lockup, form controls, password-recovery feedback, OAuth actions, and Register navigation available", async () => {
    const user = userEvent.setup();
    const view = render(<ThemeProvider defaultTheme="dark"><LoginPage /></ThemeProvider>);

    expect(screen.getByAltText(/SEG — Smart Emergency Guide/i)).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Welcome Back" })).not.toBeNull();
    expect((screen.getByRole("checkbox", { name: "Remember me" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("link", { name: "Register" }).getAttribute("href")).toBe("/register");
    expect(screen.getByRole("button", { name: "Switch to light mode" })).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Forgot password?" }));
    expect(toast.info).toHaveBeenCalledWith("Password recovery will be available in the next authentication phase.");

    await user.type(screen.getByRole("textbox", { name: "Email Address" }), "clinician@example.test");
    await user.type(screen.getByLabelText("Password"), "secure-password");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByRole("button", { name: /Preparing My Home/i })).not.toBeNull();
    expect(startLogin).toHaveBeenCalledTimes(1);

    view.unmount();
    for (const provider of ["Google", "Microsoft", "Apple"]) {
      const providerView = render(<ThemeProvider defaultTheme="dark"><LoginPage /></ThemeProvider>);
      await user.click(screen.getByRole("button", { name: new RegExp(provider, "i") }));
      providerView.unmount();
    }

    expect(startLogin).toHaveBeenCalledTimes(4);
  });
});
