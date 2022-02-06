import { render, screen } from "@testing-library/react";
import Button from "../Button";

it("should render text passed in title prop", async () => {
  render(<Button title="Hello World" />);
  const element = screen.getByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});

it("should render text passed in title prop async", async () => {
  render(<Button title="Hello World" />);
  const element = await screen.findByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});

it("should render as button", async () => {
  render(<Button title="Hello World" />);
  const element = screen.getByRole("button", { name: "Hello World" });
  expect(element).toBeInTheDocument();
});

it("should render only one button", async () => {
  render(<Button title="Hello World" />);
  const element = screen.getAllByRole("button");
  expect(element.length).toBe(1);
});

it("should only render text passed in title prop", async () => {
  render(<Button title="Hello World" />);
  const element = screen.queryByText(/Another Text/i);
  expect(element).not.toBeInTheDocument();
});

it("should render class passed in className prop", async () => {
  render(<Button title="Hello World" className="primary" />);
  const element = screen.getByRole("button", { name: "Hello World" });
  expect(element).toHaveClass("primary");
});
