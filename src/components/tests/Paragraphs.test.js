import Paragraphs from "../Paragraphs";
import { render, screen } from "@testing-library/react";

const paragraphs = ["Hello", "Hi", "Howdy"];

it("should correctly render the paragraphs", async () => {
  render(<Paragraphs paragraphs={paragraphs} />);
  const hello = screen.getByText(/Hello/i);
  expect(hello).toBeInTheDocument();

  const hi = screen.getByText(/Hi/i);
  expect(hi).toBeInTheDocument();

  const howdy = screen.getByText(/Howdy/i);
  expect(howdy).toBeInTheDocument();
});

it("should render 3 paragraphs", async () => {
  render(<Paragraphs paragraphs={paragraphs} />);
  const elements = screen.getAllByRole("paragraph");
  expect(elements.length).toBe(3);
});

it("should render when no prop passed", async () => {
  render(<Paragraphs />);
  const element = screen.getByText(/No paragraphs/i);
  expect(element).toBeInTheDocument();
});
