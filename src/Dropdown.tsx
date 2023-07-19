import { useState } from "react";

export default function Dropdown() {
  const [selections, setSelections] = useState([null, null, null]);

  const handleSelection = (index, option) => {
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections[index] = option;
      return newSelections;
    });
  };

  return (
    <ul className="space-y-4">
      {selections.map((selection, index) => (
        <li key={index}>
          <label
            className={`block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium ${
              selection ? "text-gray-700" : "text-gray-300"
            }`}
          >
            <input
              type="text"
              readOnly
              value={selection || ""}
              onClick={() =>
                !selection && handleSelection(index, `Option ${index + 1}`)
              }
              className="cursor-pointer"
              disabled={index > 0 && !selections[index - 1]}
            />
            {index < selections.length - 1 && !selection && (
              <span className="text-red-500">
                Please complete this field before proceeding.
              </span>
            )}
          </label>
        </li>
      ))}
    </ul>
  );
}
