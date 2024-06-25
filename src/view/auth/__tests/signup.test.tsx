import { act, render, screen } from "@testing-library/react";
import { SignupView } from "../signup";
import userEvent from "@testing-library/user-event";

vi.mock("firebase/auth", async () => {
  return {
    getAuth: vi.fn(),
  };
});

describe("renders <SignupView />", () => {
  it("should show", () => {
    render(<SignupView toggleLogin={() => {}} />);

    expect(screen.getByTestId("signup-view")).toBeInTheDocument();
  });

  it("should throw error for invlaid email and password", async () => {
    const user = userEvent.setup();
    render(<SignupView toggleLogin={() => {}} />);

    const nameInput = screen.getByTestId("signup-name");
    const emailInput = screen.getByTestId("signup-email");
    const passwordInput = screen.getByTestId("signup-password");

    const signupBtn = screen.getByTestId("submit-signup");

    await act(async () => {
      await user.type(nameInput, "me");
      await user.type(emailInput, "e@com");
      await user.type(passwordInput, "1235");
      await user.click(signupBtn);
    });

    expect(screen.getByTestId("error-name")).toBeInTheDocument();
    expect(screen.getByTestId("error-email")).toBeInTheDocument();
    expect(screen.getByTestId("error-password")).toBeInTheDocument();
  });

  it("should authenticate for valid emails", async () => {
    const user = userEvent.setup();
    render(<SignupView toggleLogin={() => {}} />);

    const emailInput = screen.getByTestId("signup-email");
    const passwordInput = screen.getByTestId("signup-password");

    const signupBtn = screen.getByTestId("submit-signup");

    await act(async () => {
      await user.type(emailInput, "e@e.com");
      await user.type(passwordInput, "Anewpassword77!");
      await user.click(signupBtn);
    });

    expect(screen.queryByTestId("error-email")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
  });
});
