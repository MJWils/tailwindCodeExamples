import { useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [secondIsOpen, setSecondIsOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  const handleSelection = (option) => {
    setSelection(option);
    setSecondIsOpen(true);
  };

  return (
    <div className="inline-grid grid-flow-row auto-rows-max space-y-4">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Options
          {/* SVG code omitted for brevity */}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelection("Option 1")}
              >
                Option 1
              </button>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Option 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Option 3
              </a>
            </li>
            {/* Other options omitted for brevity */}
          </ul>
        </div>
      )}

      <div>
        <button
          type="button"
          className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium ${
            selection ? "text-gray-700" : "text-gray-300"
          } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
          id="second-options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => {}}
          disabled={!selection}
          title={selection ? "" : "Disabled"}
        >
          More Options
          {/* SVG code omitted for brevity */}
        </button>
      </div>

      {secondIsOpen && (
        <div className="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="second-options-menu"
          >
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Second Option 1
              </button>
            </li>
            {/* Other options omitted for brevity */}
          </ul>
        </div>
      )}
    </div>
  );
}
