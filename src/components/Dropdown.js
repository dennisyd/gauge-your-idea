// ../components/Dropdown.jsx
import React from 'react';

function Dropdown({ label, value, onChange, options, required }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
