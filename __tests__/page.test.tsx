import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the 'Hello, World!' heading", () => {
    render(<HomePage />);
    const welcomeElement = screen.getByRole("heading", { level: 1 });
    expect(welcomeElement).toHaveTextContent("Hello, World!");
    expect(welcomeElement).toBeInTheDocument();
  });
});
