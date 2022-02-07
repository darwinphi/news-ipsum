import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("renders title", () => {
  render(<App />);
  const title = screen.getByText(/📰 News Ipsum/i);
  expect(title).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});

test("should correctly set default option", () => {
  render(<App />);
  expect(screen.getByRole("option", { name: "1" }).selected).toBe(true);
  expect(screen.getByRole("option", { name: "Short" }).selected).toBe(true);
  expect(screen.getAllByRole("option").length).toBe(6);
});

it("should allow user to change paragraph", () => {
  render(<App />);
  userEvent.selectOptions(screen.getByTestId("numOfParagraph"), "2");
  expect(screen.getByRole("option", { name: "2" }).selected).toBe(true);
});

it("useFetch hook loads", () => {
  render(<App API="uri1" />);
  const title = screen.getByText(/Loading/i);
  expect(title).toBeInTheDocument();
});
