import { useState } from "react";

const Select = ({ opts, handleChange, parentCallback }) => {
  const [options] = useState(opts);
  return (
    <select
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
