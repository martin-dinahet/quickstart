import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignUpPage from "@/app/auth/sign-up/page";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: jest.fn(),
  };
});

jest.mock("../../../src/lib/actions/auth/sign-up", () => ({
  signUp: jest.fn(() =>
    Promise.resolve({
      success: false,
      errors: {},
      form: { email: "", password: "", username: "" },
    }),
  ),
}));

describe("SignUpPage", () => {
  const useActionState = require("react").useActionState as jest.Mock;

  beforeEach(() => {
    useActionState.mockReset();
  });

  it("renders the 'Sign Up' fieldset legend", () => {
    useActionState.mockReturnValue([
      { success: false, errors: {}, form: { email: "", password: "", username: "" } },
      jest.fn(),
      false,
    ]);
    render(<SignUpPage />);
    const legendElement = screen.getByText("Sign Up");
    expect(legendElement).toBeInTheDocument();
  });

  it("renders the username, email and password inputs", () => {
    useActionState.mockReturnValue([
      { success: false, errors: {}, form: { email: "", password: "", username: "" } },
      jest.fn(),
      false,
    ]);
    render(<SignUpPage />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("john.doe@mail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("renders the 'Sign Up' button", () => {
    useActionState.mockReturnValue([
      { success: false, errors: {}, form: { email: "", password: "", username: "" } },
      jest.fn(),
      false,
    ]);
    render(<SignUpPage />);
    const signInButton = screen.getByRole("button", { name: "Sign Up" });
    expect(signInButton).toBeInTheDocument();
  });

  it("displays username, email and password errors when present in state", () => {
    useActionState.mockReturnValue([
      {
        success: false,
        errors: {
          username: ["Username is required"],
          email: ["Invalid email"],
          password: ["Password too short"],
        },
        form: { email: "bad", password: "123", username: "" },
      },
      jest.fn(),
      false,
    ]);
    render(<SignUpPage />);
    expect(screen.getByText(/Username is required/)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
    expect(screen.getByText(/Password too short/)).toBeInTheDocument();
  });

  it("prefills inputs with values from form state", () => {
    useActionState.mockReturnValue([
      {
        success: false,
        errors: {},
        form: { email: "prefill@mail.com", password: "secret", username: "tester" },
      },
      jest.fn(),
      false,
    ]);
    render(<SignUpPage />);
    expect(screen.getByDisplayValue("tester")).toBeInTheDocument();
    expect(screen.getByDisplayValue("prefill@mail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("secret")).toBeInTheDocument();
  });
});
