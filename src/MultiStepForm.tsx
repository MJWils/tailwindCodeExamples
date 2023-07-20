import React, { useState, ChangeEvent } from "react";
import Step from "./Step";

interface FormData {
  step1: string;
  step2: string;
  step3: string;
}

const MultiStepForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    step1: "",
    step2: "",
    step3: "",
  });
  const [imageSrc, setImageSrc] = useState<string>("");

  const jsArray = [
    {
      name: "a1",
      obj: [
        { nestedName: "aa1", times: [123, 456, 789] },
        { nestedName: "aa2", times: [123, 456, 789] },
      ],
    },
    {
      name: "b1",
      obj: [
        { nestedName: "bb1", times: [123, 456, 789] },
        { nestedName: "bb2", times: [123, 456, 789] },
      ],
    },
    {
      name: "c1",
      obj: [
        { nestedName: "cc1", times: [123, 456, 789] },
        { nestedName: "cc2", times: [123, 456, 789] },
      ],
    },
  ];

  const handleRequestImage = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `/api/images?step1=${formData.step1}&step2=${formData.step2}&step3=${formData.step3}`
      );
      const blob = await response.blob();
      setImageSrc(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const step = e.target.name;
    const value = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [step]: value,
      ...(step === "step1" && { step2: "", step3: "" }),
      ...(step === "step2" && { step3: "" }),
    }));
  };

  const allStepsCompleted = Object.values(formData).every(
    (field) => field !== ""
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Multi-Step Form</h2>

        <Step
          stepNumber={1}
          value={formData.step1}
          onChange={handleInputChange}
          disabled={false}
          options={jsArray.map((item) => item.name)}
        />

        <Step
          stepNumber={2}
          value={formData.step2}
          onChange={handleInputChange}
          disabled={!formData.step1}
          options={
            formData.step1
              ? jsArray
                  .find((item) => item.name === formData.step1)
                  ?.obj.map((o) => o.nestedName) || []
              : []
          }
        />

        <Step
          stepNumber={3}
          value={formData.step3}
          onChange={handleInputChange}
          disabled={!formData.step2}
          options={
            formData.step2
              ? jsArray
                  .find((item) => item.name === formData.step1)
                  ?.obj.find((o) => o.nestedName === formData.step2)?.times ||
                []
              : []
          }
        />

        {allStepsCompleted && (
          <button
            onClick={handleRequestImage}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Request Image
          </button>
        )}

        {imageSrc && <img src={imageSrc} alt="Requested" />}
      </div>
    </div>
  );
};

export default MultiStepForm;
