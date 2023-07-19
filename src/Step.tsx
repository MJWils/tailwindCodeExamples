import React, { ChangeEvent, FC } from "react";

interface StepProps {
  stepNumber: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
  options: string[];
}

const Step: FC<StepProps> = ({
  stepNumber,
  value,
  onChange,
  disabled,
  options = [],
}) => (
  <div className="mb-4">
    <label className="block text-gray-700">Step {stepNumber}</label>
    <select
      name={`step${stepNumber}`}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded"
      disabled={disabled}
    >
      <option value="">Select...</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Step;
