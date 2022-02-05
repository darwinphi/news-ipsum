import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import App from "./App";

test("renders title", () => {
  render(<App />);
  const title = screen.getByText(/📰 News Ipsum/i);
  expect(title).toBeInTheDocument();
});

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("useFetch hook loads", () => {
  render(<App API="uri1" />, container);
  const title = screen.getByText(/Loading/i);
  expect(title).toBeInTheDocument();
});
