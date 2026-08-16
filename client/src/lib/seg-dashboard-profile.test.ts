import { describe, expect, it } from "vitest";
import { segDashboardPresentationProfile } from "./seg-dashboard-profile";

describe("segDashboardPresentationProfile", () => {
  it("provides the shared presentation identity used by My Home", () => {
    expect(segDashboardPresentationProfile).toEqual({
      displayName: "Dr. Ahmed",
      initials: "A",
      specialty: "Emergency Medicine",
    });
  });
});
