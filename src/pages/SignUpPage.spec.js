import SignUpPage from "./SignUpPage.jsx";
import { render, screen } from "@testing-library/react";

it("has header", () => {
  render(<SignUpPage />);
  const header = screen.queryByRole("heading", { name: "Sign Up" });

  expect(header).toBeInTheDocument();
});
