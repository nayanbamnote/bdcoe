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

interface NewProfileFormProps {
  initialData?: FormData | null
}

export default function NewProfileForm({ initialData }: NewProfileFormProps) {
  const [step, setStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState<FormData>(initialData || {})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])
  
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
    
    // Update formData first
    const updatedFormData = {...formData, accommodation: data};
    setFormData(updatedFormData);
    
    // Then submit the complete form
    await submitCompleteForm(updatedFormData);
  }
  
  async function submitCompleteForm(completeFormData: FormData) {
    console.log("Full form data before API call:", completeFormData);
    
    setIsSubmitting(true);
    
    try {
      // Submit the complete form data to the API
      const response = await fetch("/api/profile-complete", {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: completeFormData.profile,
          academic: completeFormData.academic,
          additional: completeFormData.additional,
          guardian: completeFormData.guardian,
          siblings: completeFormData.siblings || [],
          interests: completeFormData.interests || [],
          academicHistory: completeFormData.academicHistory || [],
          accommodation: {
            isHosteler: completeFormData.accommodation?.isHosteler || false,
            hasScholarship: completeFormData.accommodation?.hasScholarship || false,
            hostelDetails: completeFormData.accommodation?.hostelDetails || [],
            scholarshipDetails: completeFormData.accommodation?.scholarshipDetails || []
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `Failed to submit profile: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("API response data:", result);
      
      toast({
        title: initialData ? "Profile updated!" : "Profile created!",
        description: initialData 
          ? "Your profile has been successfully updated."
          : "Your profile has been successfully created.",
      });
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "There was a problem submitting your information.",
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