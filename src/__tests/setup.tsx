import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("zustand");

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
