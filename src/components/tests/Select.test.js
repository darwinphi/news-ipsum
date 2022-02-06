import { render, screen } from "@testing-library/react";
import Select from "../Select";
import userEvent from "@testing-library/user-event";

const opts = [
  {
    value: 1,
    label: "One",
  },
  {
    value: 2,
    label: "Two",
  },
  {
    value: 3,
    label: "Three",
  },
];

it("should render select element", async () => {
  render(<Select />);
  const element = screen.getByRole("combobox");
  expect(element).toBeInTheDocument();
});

it("should render the correct number of options passed in prop", async () => {
  render(<Select opts={opts} />);
  const element = screen.getByRole("combobox");
  expect(element.length).toBe(3);
});

it("should render the correct number of options", async () => {
  render(<Select opts={opts} />);
  const element = screen.getAllByRole("option");
  expect(element.length).toBe(3);
});

it("should correctly set default option", () => {
  render(<Select opts={opts} />);
  const element = screen.getByRole("option", { name: "One" });
  expect(element.selected).toBe(true);
});

it("should correctly set the value", () => {
  render(<Select opts={opts} />);
  const option1 = screen.getByRole("option", { name: "One" });
  expect(option1).toHaveValue("1");
  const option2 = screen.getByRole("option", { name: "Two" });
  expect(option2).toHaveValue("2");
  const option3 = screen.getByRole("option", { name: "Three" });
  expect(option3).toHaveValue("3");
});

const mockFn = jest.fn();

it("should correctly change the selected option", () => {
  render(<Select opts={opts} handleChange={mockFn} parentCallback={mockFn} />);
  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "Two" })
  );
  expect(screen.getByRole("option", { name: "Two" }).selected).toBe(true);
  expect(screen.getByRole("option", { name: "One" }).selected).toBe(false);
});
