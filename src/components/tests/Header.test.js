import { render, screen } from "@testing-library/react";
import Header from "../Header";

it("should render text passed in title props", async () => {
  render(<Header title="Hello World" />);
  const title = screen.getByText(/Hello World/i);
  expect(title).toBeInTheDocument();
});

it("should render as heading", async () => {
  render(<Header title="Hello World" />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});
