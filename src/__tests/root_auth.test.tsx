import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";

import RootApp from "../root";

vi.mock("firebase/firestore", () => {
  return {
    getDocs: vi.fn(),
    collection: vi.fn(),
    getFirestore: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
  };
});

const activeUser = {
  displayName: "user",
  email: "email@gmail.com",
  uid: 1,
};

vi.mock("firebase/auth", async (importOriginal) => {
  const mod = await importOriginal<typeof import("firebase/auth")>();
  return {
    ...mod,
    getAuth: vi.fn(),
    onAuthStateChanged: vi
      .fn()
      .mockImplementationOnce((_, cb) => cb(activeUser)),
  };
});

describe("Renders <App />: display todos", () => {
  it("should show task view", async () => {
    const wrapper = render(<RootApp />);
    expect(wrapper).toBeTruthy();

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 300)),
    );

    expect(screen.queryByTestId("app-loader")).toBeFalsy();

    const taskView = screen.getByTestId("task-view");
    expect(taskView).toBeInTheDocument();
  });
});
