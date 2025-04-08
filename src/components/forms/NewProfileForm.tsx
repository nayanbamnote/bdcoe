"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

import {
  PersonalInfoForm,
  AcademicInfoForm,
  AdditionalDetailsForm,
  GuardianDetailsForm,
  SiblingsDetailsForm,
  InterestsForm,
  AcademicHistoryForm,
  AccommodationForm,
  FormProgress,
  FormStep,
  FormData,
  studentProfileSchema,
  academicInfoSchema,
  additionalDetailsSchema,
  guardianDetailsSchema,
  siblingsDetailsSchema,
  interestsSchema,
  academicHistorySchema,
  accommodationSchema
} from "./profile-steps"

export default function NewProfileForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState<FormData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  function nextStep() {
    if (step < 8) {
      setStep((step + 1) as FormStep)
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep((step - 1) as FormStep)
    }
  }

  async function onProfileSubmit(data: typeof studentProfileSchema._type) {
    console.log("Profile data submitted:", data);
    setFormData({...formData, profile: data})
    nextStep()
  }

  async function onAcademicSubmit(data: typeof academicInfoSchema._type) {
    console.log("Academic data submitted:", data);
    setFormData({...formData, academic: data})
    nextStep()
  }

  async function onAdditionalDetailsSubmit(data: typeof additionalDetailsSchema._type) {
    console.log("Additional details submitted:", data);
    setFormData({...formData, additional: data})
    nextStep()
  }

  async function onGuardianDetailsSubmit(data: typeof guardianDetailsSchema._type) {
    console.log("Guardian details submitted:", data);
    setFormData({...formData, guardian: data})
    nextStep()
  }

  async function onSiblingsDetailsSubmit(data: typeof siblingsDetailsSchema._type) {
    console.log("Siblings details submitted:", data);
    setFormData({...formData, siblings: data})
    nextStep()
  }

  async function onInterestsSubmit(data: typeof interestsSchema._type) {
    console.log("Interests submitted:", data);
    setFormData({...formData, interests: data})
    nextStep()
  }

  async function onAcademicHistorySubmit(data: typeof academicHistorySchema._type) {
    console.log("Academic history submitted:", data);
    setFormData({...formData, academicHistory: data})
    nextStep()
  }

  async function onAccommodationSubmit(data: typeof accommodationSchema._type) {
    console.log("Accommodation data submitted:", data);
    
    // First update the form data state
    setFormData(prevData => {
      const updatedData = {...prevData, accommodation: data};
      
      // Then submit the form once state is updated
      submitCompleteForm(updatedData);
      
      return updatedData;
    });
  }
  
  async function submitCompleteForm(completeFormData: FormData) {
    console.log("Full form data before API call:", completeFormData);
    
    setIsSubmitting(true);
    
    try {
      console.log("Sending API request to /api/profile-complete");
      
      // Submit the complete form data to the API
      const response = await fetch("/api/profile-complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeFormData),
      });
      
      console.log("API response status:", response.status);
      const result = await response.json();
      console.log("API response data:", result);
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit profile");
      }
      
      // Show success toast
      toast({
        title: "Profile created!",
        description: "Your profile has been successfully created.",
      });
      
      // You could redirect here or reset all forms
    } catch (error) {
      console.error("Error submitting profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your information.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[768px] rounded-lg border bg-white p-[24px] shadow-md">
      <FormProgress currentStep={step} />

      {step === 1 && (
        <PersonalInfoForm 
          defaultValues={formData.profile} 
          onSubmit={onProfileSubmit} 
        />
      )}

      {step === 2 && (
        <AcademicInfoForm 
          defaultValues={formData.academic} 
          onSubmit={onAcademicSubmit} 
          onPrevious={prevStep} 
        />
      )}

      {step === 3 && (
        <AdditionalDetailsForm 
          defaultValues={formData.additional} 
          onSubmit={onAdditionalDetailsSubmit} 
          onPrevious={prevStep} 
        />
      )}

      {step === 4 && (
        <GuardianDetailsForm 
          defaultValues={formData.guardian} 
          onSubmit={onGuardianDetailsSubmit} 
          onPrevious={prevStep} 
          isSubmitting={false} 
        />
      )}

      {step === 5 && (
        <SiblingsDetailsForm 
          defaultValues={formData.siblings} 
          onSubmit={onSiblingsDetailsSubmit} 
          onPrevious={prevStep} 
        />
      )}

      {step === 6 && (
        <InterestsForm 
          defaultValues={formData.interests} 
          onSubmit={onInterestsSubmit} 
          onPrevious={prevStep} 
          isSubmitting={false} 
        />
      )}

      {step === 7 && (
        <AcademicHistoryForm 
          defaultValues={formData.academicHistory} 
          onSubmit={onAcademicHistorySubmit} 
          onPrevious={prevStep} 
          isSubmitting={false} 
        />
      )}

      {step === 8 && (
        <AccommodationForm 
          defaultValues={formData.accommodation} 
          onSubmit={onAccommodationSubmit} 
          onPrevious={prevStep} 
          isSubmitting={isSubmitting} 
        />
      )}
      
      <div className="mt-[24px] text-[14px] text-gray-500">
        <p>* Required fields</p>
      </div>
    </div>
  )
} 