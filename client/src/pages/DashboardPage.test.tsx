import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "./DashboardPage";

vi.mock("@/components/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

describe("My Home visual-only reference alignment", () => {
  it("keeps the approved dashboard hierarchy and existing internal-section anchors", () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { name: "Dr. Ahmed" })).not.toBeNull();
    expect(screen.getByText("EMERGENCY ACTION")).not.toBeNull();
    expect(screen.getByText("Professional Growth Core")).not.toBeNull();
    expect(screen.getByText("Upcoming Learning")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Atlas & Visual Assets" })).not.toBeNull();
    expect(screen.queryByText(/^Reference$/i)).toBeNull();
    expect(screen.getAllByText("Anatomy").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ECG").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Imaging").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ultrasound").length).toBeGreaterThan(0);
    expect(screen.getByText("Point-of-Care Ultrasound (POCUS)")).not.toBeNull();
    expect(screen.getAllByText("Critical Care").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Toxicology").length).toBeGreaterThan(0);
    expect(document.getElementById("learn")).not.toBeNull();
    expect(document.getElementById("pathway")).not.toBeNull();
    expect(document.getElementById("practice")).not.toBeNull();
    expect(document.getElementById("reference")).not.toBeNull();
    expect(document.getElementById("journal")).not.toBeNull();
    expect(screen.getByRole("heading", { name: "My Learning Pathway" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Build your professional learning route" })).not.toBeNull();
    expect(screen.getByRole("link", { name: /Explore learning modules/i }).getAttribute("href")).toBe("#learn");
    expect(screen.getByRole("heading", { name: "Learn" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Continue your learning journey" })).not.toBeNull();
    expect(screen.getByRole("link", { name: /View learning pathway/i }).getAttribute("href")).toBe("#pathway");
    expect(screen.getByRole("heading", { name: "Practice" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Build confidence with your current tools" })).not.toBeNull();
    expect(screen.getByRole("link", { name: /Return to learning/i }).getAttribute("href")).toBe("#learn");
    expect(screen.getByRole("heading", { name: "Practice Modes" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Medical Journal" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Organize approved professional knowledge" })).not.toBeNull();
    expect(screen.getByRole("link", { name: /View professional records/i }).getAttribute("href")).toBe("#account");
    expect(screen.getByRole("textbox", { name: "Search approved journal entries" }).hasAttribute("disabled")).toBe(true);
    expect(screen.getByText(/No approved journal article is available for display/)).not.toBeNull();
    expect(document.querySelector<HTMLImageElement>(".seg-core-dashboard-brain-heart")?.src).toContain("SEG_Dashboard_Brain_Heart_Core_Clean_Approved_45d2f500.png");
    expect(document.querySelector(".seg-core-blend-field")).not.toBeNull();
    expect(document.querySelector(".seg-core-artifact-mask")).not.toBeNull();
    expect(document.querySelector<HTMLImageElement>('[data-seg-shared-asset="primary-logo"]')?.src).toContain("SEG_Primary_Logo_Approved_1f60ebe3.png");
    expect(document.querySelector<HTMLImageElement>('[data-seg-shared-asset="hero-logo"]')?.src).toContain("SEG_Hero_Logo_Heart_Brain_ECG_Approved_c28d10bb.png");
    expect(document.querySelector<HTMLImageElement>('[data-seg-shared-asset="anatomy-hologram"]')?.src).toContain("SEG_Human_Anatomy_Hologram_c23d102e.png");
    expect(document.querySelector<HTMLImageElement>('[data-seg-shared-asset="brain-heart-core"]')?.src).toContain("SEG_Brain_Heart_Intelligence_Core_593bc09a.png");
    expect(document.querySelector<HTMLImageElement>('[data-seg-approved-asset="atlas-visual-assets-hero"]')?.src).toContain("SEG_ATLAS_VISUAL_ASSETS_HERO_v1.0_b0cd2819.png");
    expect(document.querySelector('[data-seg-layout="atlas-internal-stage"]')).not.toBeNull();
    expect(document.querySelector('[data-seg-layout="pathway-workspace"].seg-workspace-shell')).not.toBeNull();
    expect(document.querySelector('[data-seg-layout="learn-workspace"] .seg-workspace-metrics')).not.toBeNull();
    expect(document.querySelector('[data-seg-layout="practice-workspace"] .seg-workspace-metrics')).not.toBeNull();
    expect(document.querySelector('[data-seg-layout="atlas-internal-stage"] .seg-atlas-navigation')).not.toBeNull();
    expect(document.querySelector('[data-seg-layout="journal-workspace"] .seg-journal-empty')).not.toBeNull();
  });
});
