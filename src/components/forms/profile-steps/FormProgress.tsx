import { FormStep } from "./types"

interface FormProgressProps {
  currentStep: FormStep
}

export function FormProgress({ currentStep }: FormProgressProps) {
  const progressPercentage = (currentStep / 8) * 100

  return (
    <div className="mb-[32px]">
      <div className="mb-[16px] h-[6px] sm:h-[8px] w-full rounded-full bg-gray-200">
        <div 
          className="h-[6px] sm:h-[8px] rounded-full bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
          <div 
            key={step}
            className={`flex h-[24px] w-[24px] sm:h-[40px] sm:w-[40px] text-[12px] sm:text-[14px] items-center justify-center rounded-full ${
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
      <div className="mt-[8px] sm:mt-[16px] grid grid-cols-8 text-center text-[10px] sm:text-[14px] gap-1">
        <div className={`${currentStep >= 1 ? "text-primary font-medium" : ""} hidden sm:block`}>Personal Info</div>
        <div className={`${currentStep >= 2 ? "text-primary font-medium" : ""} hidden sm:block`}>Academic</div>
        <div className={`${currentStep >= 3 ? "text-primary font-medium" : ""} hidden sm:block`}>Additional Details</div>
        <div className={`${currentStep >= 4 ? "text-primary font-medium" : ""} hidden sm:block`}>Guardian Details</div>
        <div className={`${currentStep >= 5 ? "text-primary font-medium" : ""} hidden sm:block`}>Siblings</div>
        <div className={`${currentStep >= 6 ? "text-primary font-medium" : ""} hidden sm:block`}>Interests</div>
        <div className={`${currentStep >= 7 ? "text-primary font-medium" : ""} hidden sm:block`}>Academic History</div>
        <div className={`${currentStep >= 8 ? "text-primary font-medium" : ""} hidden sm:block`}>Accommodation</div>

        {/* Mobile labels - abbreviated versions */}
        <div className={`${currentStep >= 1 ? "text-primary font-medium" : ""} sm:hidden`}>Info</div>
        <div className={`${currentStep >= 2 ? "text-primary font-medium" : ""} sm:hidden`}>Acad</div>
        <div className={`${currentStep >= 3 ? "text-primary font-medium" : ""} sm:hidden`}>Add</div>
        <div className={`${currentStep >= 4 ? "text-primary font-medium" : ""} sm:hidden`}>Guard</div>
        <div className={`${currentStep >= 5 ? "text-primary font-medium" : ""} sm:hidden`}>Sibl</div>
        <div className={`${currentStep >= 6 ? "text-primary font-medium" : ""} sm:hidden`}>Int</div>
        <div className={`${currentStep >= 7 ? "text-primary font-medium" : ""} sm:hidden`}>Hist</div>
        <div className={`${currentStep >= 8 ? "text-primary font-medium" : ""} sm:hidden`}>Acc</div>
      </div>
    </div>
  )
} 