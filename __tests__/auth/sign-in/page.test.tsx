import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignInPage from "@/app/auth/sign-in/page";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: jest.fn(),
  };
});

jest.mock("../../../src/lib/actions/auth/sign-in", () => ({
  signIn: jest.fn(() =>
    Promise.resolve({
      success: false,
      errors: {},
      form: { email: "", password: "" },
    }),
  ),
}));

describe("SignInPage", () => {
  const useActionState = require("react").useActionState as jest.Mock;

  beforeEach(() => {
    useActionState.mockReset();
  });

  it("renders the 'Login' fieldset legend", () => {
    useActionState.mockReturnValue([
      { success: false, errors: {}, form: { email: "", password: "" } },
      jest.fn(),
      false,
    ]);
    render(<SignInPage />);
    const legendElement = screen.getByText("Login");
    expect(legendElement).toBeInTheDocument();
  });

  it("renders the email and password input fields with placeholders", () => {
    useActionState.mockReturnValue([
      { success: false, errors: {}, form: { email: "", password: "" } },
      jest.fn(),
      false,
    ]);
    render(<SignInPage />);
    const emailInput = screen.getByPlaceholderText("john.doe@mail.com");
    const passwordInput = screen.getByPlaceholderText("●●●●●●●●");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders the 'Sign In' button", () => {
    useActionState.mockReturnValue([
      { success: false, errors: {}, form: { email: "", password: "" } },
      jest.fn(),
      false,
    ]);
    render(<SignInPage />);
    const signInButton = screen.getByRole("button", { name: "Sign In" });
    expect(signInButton).toBeInTheDocument();
  });

  it("displays email error when present in state", () => {
    useActionState.mockReturnValue([
      {
        success: false,
        errors: { email: ["User not found"] },
        form: { email: "notfound@mail.com", password: "" },
      },
      jest.fn(),
      false,
    ]);
    render(<SignInPage />);
    const emailError = screen.getByText(/User not found/);
    expect(emailError).toBeInTheDocument();
  });

  it("displays password error when present in state", () => {
    useActionState.mockReturnValue([
      {
        success: false,
        errors: { password: ["Incorrect email or password"] },
        form: { email: "john@mail.com", password: "bad" },
      },
      jest.fn(),
      false,
    ]);
    render(<SignInPage />);
    const passwordError = screen.getByText(/Incorrect email or password/);
    expect(passwordError).toBeInTheDocument();
  });

  it("prefills inputs with values from form state", () => {
    useActionState.mockReturnValue([
      {
        success: false,
        errors: {},
        form: { email: "prefill@mail.com", password: "secret" },
      },
      jest.fn(),
      false,
    ]);
    render(<SignInPage />);
    const emailInput = screen.getByDisplayValue("prefill@mail.com");
    const passwordInput = screen.getByDisplayValue("secret");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
