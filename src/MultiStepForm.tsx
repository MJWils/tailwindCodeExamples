import React, { useState } from "react";

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    step1: "",
    step2: "",
    step3: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const allStepsCompleted = Object.values(formData).every(
    (field) => field !== ""
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Multi-Step Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Step 1</label>
          <select
            name="step1"
            value={formData.step1}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={false}
          >
            <option value="">Select...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Step 2</label>
          <select
            name="step2"
            value={formData.step2}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={!formData.step1}
          >
            <option value="">Select...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Step 3</label>
          <select
            name="step3"
            value={formData.step3}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={!formData.step2}
          >
            <option value="">Select...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        {allStepsCompleted && (
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Request Image
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
