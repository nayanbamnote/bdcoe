'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our form data
interface AcademicFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  contactEmail: string;
  phoneNumber: string;
  
  // Academic Background
  highSchoolName: string;
  highSchoolGPA: number;
  graduationYear: number;
  
  // Current Academic Status
  currentInstitution?: string;
  major?: string;
  minor?: string;
  currentGPA?: number;
  expectedGraduation?: number;
  
  // Academic Achievements
  honors: string[];
  scholarships: string[];
  certifications: string[];
  
  // Research Experience
  researchExperience: Array<{
    title: string;
    institution: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  
  // Extracurricular Activities
  extracurriculars: Array<{
    activity: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  
  // Additional Information
  additionalInfo?: string;
}

interface FormContextType {
  formData: AcademicFormData;
  updateFormData: (newData: Partial<AcademicFormData>) => void;
  validateStep: (step: number) => boolean;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const defaultFormData: AcademicFormData = {
  // Personal Information
  fullName: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  contactEmail: '',
  phoneNumber: '',
  
  // Academic Background
  highSchoolName: '',
  highSchoolGPA: 0,
  graduationYear: new Date().getFullYear(),
  
  // Academic Achievements
  honors: [],
  scholarships: [],
  certifications: [],
  
  // Research Experience
  researchExperience: [],
  
  // Extracurricular Activities
  extracurriculars: [],
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<AcademicFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (newData: Partial<AcademicFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData,
    }));
  };

  // Validation logic for each step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Step 0: Personal Information
    if (step === 0) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }
      
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
        isValid = false;
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
        isValid = false;
      }
      
      if (!formData.nationality) {
        newErrors.nationality = 'Nationality is required';
        isValid = false;
      }
      
      if (!formData.contactEmail) {
        newErrors.contactEmail = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Email is invalid';
        isValid = false;
      }
      
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
        isValid = false;
      }
    }
    
    // Step 1: Academic Background
    else if (step === 1) {
      if (!formData.highSchoolName) {
        newErrors.highSchoolName = 'High school name is required';
        isValid = false;
      }
      
      if (formData.highSchoolGPA < 0 || formData.highSchoolGPA > 4.0) {
        newErrors.highSchoolGPA = 'GPA must be between 0 and 4.0';
        isValid = false;
      }
      
      if (!formData.graduationYear || formData.graduationYear < 1900 || formData.graduationYear > 2100) {
        newErrors.graduationYear = 'Please enter a valid graduation year';
        isValid = false;
      }
    }
    
    // Add validation for other steps as needed

    setErrors(newErrors);
    return isValid;
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, validateStep, errors, setErrors }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}; 