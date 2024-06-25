import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import RootApp from "../root";

vi.mock("firebase/auth", async (importOriginal) => {
  const mod = await importOriginal<typeof import("firebase/auth")>();
  return {
    ...mod,
    getAuth: vi.fn(),
    onAuthStateChanged: vi.fn(),
  };
});

describe("Renders <App />: loading", () => {
  it("should show loading screen", () => {
    const wrapper = render(<RootApp />);
    expect(wrapper).toBeTruthy();

    const loadScreen = screen.getByTestId("app-loader");
    expect(loadScreen).toBeInTheDocument();
  });
});
