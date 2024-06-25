import { act, render, screen } from "@testing-library/react";
import { LoginView } from "../login";
import userEvent from "@testing-library/user-event";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Mock } from "vitest";

vi.mock("firebase/auth", async () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  };
});

describe("renders <LoginView />", () => {
  it("should show", () => {
    render(<LoginView toggleSignUp={() => {}} />);

    expect(screen.getByTestId("login-view")).toBeInTheDocument();
  });

  it("should throw error for invlaid email and password", async () => {
    const user = userEvent.setup();
    render(<LoginView toggleSignUp={() => {}} />);

    const emailInput = screen.getByTestId("login-email");
    const passwordInput = screen.getByTestId("login-password");

    const loginBtn = screen.getByTestId("submit-login");

    await act(async () => {
      await user.type(emailInput, "e@com");
      await user.type(passwordInput, "1235");
      await user.click(loginBtn);
    });

    expect(screen.getByTestId("email-error")).toBeInTheDocument();
    expect(screen.getByTestId("password-error")).toBeInTheDocument();
  });

  it("should authenticate for valid emails", async () => {
    (signInWithEmailAndPassword as Mock).mockResolvedValue({
      displayName: "user",
      email: "email@gmail.com",
      uid: 1,
    });

    const user = userEvent.setup();
    render(<LoginView toggleSignUp={() => {}} />);

    const emailInput = screen.getByTestId("login-email");
    const passwordInput = screen.getByTestId("login-password");

    const loginBtn = screen.getByTestId("submit-login");

    await act(async () => {
      await user.type(emailInput, "e@e.com");
      await user.type(passwordInput, "Anewpassword77!");
      await user.click(loginBtn);
    });

    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("password-error")).not.toBeInTheDocument();
  });
});
