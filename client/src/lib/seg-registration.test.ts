import { describe, expect, it } from "vitest";
import { isRegistrationPasswordStrong } from "./seg-registration";

describe("Registration password-strength interaction", () => {
  it("keeps the existing eight-character visual threshold", () => {
    expect(isRegistrationPasswordStrong("")).toBe(false);
    expect(isRegistrationPasswordStrong("SEG2026")).toBe(false);
    expect(isRegistrationPasswordStrong("SEG2026!")).toBe(true);
  });
});
