import { useState } from "react";

const Select = ({ opts, handleChange, parentCallback, dataTestId }) => {
  const [options] = useState(opts);
  return (
    <select
      data-testid={dataTestId}
      onChange={(e) => {
        handleChange(e.target.value);
        parentCallback();
      }}
    >
      {options &&
        options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
