import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";

import RootApp from "../root";

vi.mock("firebase/auth", async (importOriginal) => {
  const mod = await importOriginal<typeof import("firebase/auth")>();
  return {
    ...mod,
    getAuth: vi.fn(),
    onAuthStateChanged: vi.fn().mockImplementationOnce((_, cb) => cb(null)),
  };
});

describe("Renders <App />: login", () => {
  it("should show register view", async () => {
    const wrapper = render(<RootApp />);
    expect(wrapper).toBeTruthy();

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 200)),
    );

    expect(screen.queryByTestId("app-loader")).toBeFalsy();

    const registerView = screen.getByTestId("register-view");
    expect(registerView).toBeInTheDocument();
  });
});
