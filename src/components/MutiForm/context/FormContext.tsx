'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our form data
export interface FormData {
  // Personal Details
  name?: string;
  fullName?: string;
  dob?: string;
  dateOfBirth?: string;
  contact?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  currentAddress?: string;
  aadharNumber?: string;
  bloodGroup?: string;
  aadharAddress?: string;
  permanentAddress?: string;
  casteCategory?: string;
  subcaste?: string;
  religion?: string;
  profilePhoto?: File | null;
  
  // Education Details
  highestQualification?: string;
  university?: string;
  yearOfPassing?: string | number;
  percentage?: string | number;
  currentInstitution?: string;
  currentCourse?: string;
  currentYear?: string;
  
  // Family Details
  fatherName?: string;
  fatherOccupation?: string;
  fatherContact?: string;
  motherName?: string;
  motherOccupation?: string;
  motherContact?: string;
  hasSiblings?: boolean;
  siblingName?: string;
  siblingAge?: string | number;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyContactRelation?: string;
  
  // Interests & Skills
  technicalInterests?: string[];
  skills?: string[];
  hobbies?: string;
  achievements?: string;
  careerGoals?: string;
}

// Define the shape of our context
interface FormContextType {
  formData: FormData;
  currentStep: number;
  totalSteps: number;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  submitForm: () => void;
}

// Create the context with default values
const FormContext = createContext<FormContextType>({
  formData: {},
  currentStep: 0,
  totalSteps: 5,
  updateFormData: () => {},
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  resetForm: () => {},
  submitForm: () => {},
});

// Create a provider component
interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5; // Total number of steps in the form

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
  };

  const submitForm = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // After successful submission, you might want to reset the form
    // resetForm();
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        totalSteps,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        resetForm,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Create a custom hook to use the form context
export const useFormContext = () => useContext(FormContext); 