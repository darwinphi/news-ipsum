import { render, screen } from "@testing-library/react";
import Header from "../Header";

it("should render text passed in title prop", async () => {
  render(<Header title="Hello World" />);
  const element = screen.getByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});

it("should render text passed in title prop async", async () => {
  render(<Header title="Hello World" />);
  const element = await screen.findByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});

it("should render as heading", async () => {
  render(<Header title="Hello World" />);
  const element = screen.getByRole("heading", { name: "Hello World" });
  expect(element).toBeInTheDocument();
});

it("should render only one heading", async () => {
  render(<Header title="Hello World" />);
  const element = screen.getAllByRole("heading");
  expect(element.length).toBe(1);
});

it("should only render text passed in title prop", async () => {
  render(<Header title="Hello World" />);
  const element = screen.queryByText(/Another Text/i);
  expect(element).not.toBeInTheDocument();
});
