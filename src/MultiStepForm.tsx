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
    const step = e.target.name as Steps;
    const value = e.target.value;

    setFormData((prevState) => {
      let updatedState = {
        ...prevState,
        [step]: value,
      };

      if (step === Steps.STEP1) {
        updatedState = {
          ...updatedState,
          [Steps.STEP2]: "",
          [Steps.STEP3]: "",
        };
      } else if (step === Steps.STEP2) {
        updatedState = {
          ...updatedState,
          [Steps.STEP3]: "",
        };
      }

      return updatedState;
    });
  };

  const handleReset = () => {
    setFormData({
      step1: "",
      step2: "",
      step3: "",
    });
    setImageSrc("");
  };
  const getOptions = (
    stepNumber: number,
    previousSelection: string,
    property: string
  ) => {
    if (!previousSelection) {
      return [];
    }

    const item = jsArray.find((item) => item.name === previousSelection);
    console.log("item", item);
    if (!item) {
      return [];
    }

    if (stepNumber === 2) {
      return item.obj.map((o) => o[property]) || [];
    }

    if (stepNumber === 3) {
      const nestedItem = item.obj.find(
        (o) => o.nestedName === previousSelection
      );
      return nestedItem ? nestedItem[property] : [];
    }

    return [];
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
          options={getOptions(2, formData.step1, "nestedName")}
        />

        <Step
          stepNumber={3}
          value={formData.step3}
          onChange={handleInputChange}
          disabled={!formData.step2}
          options={getOptions(3, formData.step2, "times")}
        />

        {allStepsCompleted && (
          <div className="flex justify-between">
            <button
              onClick={handleRequestImage}
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Request Image
            </button>
            <button
              onClick={handleReset}
              className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        )}

        {imageSrc && (
          <img src={imageSrc} alt="Requested" className="absolute right-0" />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
