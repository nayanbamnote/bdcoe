import { FormStep } from "./types"

interface FormProgressProps {
  currentStep: FormStep
}

export function FormProgress({ currentStep }: FormProgressProps) {
  const progressPercentage = (currentStep / 8) * 100

  return (
    <div className="mb-[32px]">
      <div className="mb-[16px] h-[8px] w-full rounded-full bg-gray-200">
        <div 
          className="h-[8px] rounded-full bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
          <div 
            key={step}
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${
              step === currentStep 
                ? "bg-primary text-white" 
                : step < currentStep 
                  ? "bg-green-100 text-green-700 border border-green-500" 
                  : "border border-gray-300 text-gray-400"
            }`}
          >
            {step < currentStep ? "✓" : step}
          </div>
        ))}
      </div>
      <div className="mt-[16px] grid grid-cols-8 text-center text-[14px]">
        <div className={currentStep >= 1 ? "text-primary font-medium" : ""}>Personal Info</div>
        <div className={currentStep >= 2 ? "text-primary font-medium" : ""}>Academic</div>
        <div className={currentStep >= 3 ? "text-primary font-medium" : ""}>Additional Details</div>
        <div className={currentStep >= 4 ? "text-primary font-medium" : ""}>Guardian Details</div>
        <div className={currentStep >= 5 ? "text-primary font-medium" : ""}>Siblings</div>
        <div className={currentStep >= 6 ? "text-primary font-medium" : ""}>Interests</div>
        <div className={currentStep >= 7 ? "text-primary font-medium" : ""}>Academic History</div>
        <div className={currentStep >= 8 ? "text-primary font-medium" : ""}>Accommodation</div>
      </div>
    </div>
  )
} 