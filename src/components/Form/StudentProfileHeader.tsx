"use client"
import React, { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { ProfileDetails } from '@/types/profile'
import { saveProfileToDatabase } from '@/utils/profile-utils'
import { ProfileImageUploader } from '@/components/Form/ProfileComponents/ProfileImageUploader'
import { ProfileForm } from '@/components/Form/ProfileComponents/ProfileForm'
import { ProfileDisplay } from '@/components/Form/ProfileComponents/ProfileDisplay'
import { ProfileActions } from '@/components/Form/ProfileComponents/ProfileActions'
import { ProfileSkeleton } from '@/components/Form/ProfileComponents/ProfileSkeleton'
import { useProfileImage } from '@/hooks/useProfileImage'
import * as z from "zod"

// Add validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  location: z.string().min(2, "Location must be at least 2 characters").max(100, "Location must be less than 100 characters"),
  imageUrl: z.string().nullable(),
});

const StudentProfileHeader = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Add validation errors state
  const [validationErrors, setValidationErrors] = useState<{
    [K in keyof ProfileDetails]?: string
  }>({});
  
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    email: "",
    phone: "",
    location: "",
    imageUrl: null
  });

  // Add validation function
  const validateField = (field: keyof ProfileDetails, value: string) => {
    try {
      profileSchema.shape[field].parse(value);
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(prev => ({
          ...prev,
          [field]: error.errors[0].message
        }));
      }
    }
  };

  const handleInputChange = (field: keyof ProfileDetails, value: string) => {
    setProfileDetails(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  const saveChanges = async () => {
    try {
      // Validate all fields before saving
      profileSchema.parse(profileDetails);
      
      setIsSaving(true);
      await saveProfileToDatabase(profileDetails);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Update all validation errors
        const errors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0] as keyof ProfileDetails;
          acc[field] = curr.message;
          return acc;
        }, {} as { [K in keyof ProfileDetails]?: string });
        
        setValidationErrors(errors);
      } else {
        toast({
          title: "Error",
          description: "Failed to save changes",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const { file, image, uploadProgress, handleImageUpload, setFile, setImage } = useProfileImage(
    async (imageUrl) => {
      const updatedProfile = { ...profileDetails, imageUrl };
      setProfileDetails(updatedProfile);
      await saveProfileToDatabase(updatedProfile);
    }
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const { data } = await response.json();
        
        if (data) {
          setProfileDetails({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            imageUrl: data.imageUrl || null
          });
          
          if (data.imageUrl) {
            setImage(data.imageUrl);
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [toast, setImage]);

  if (isLoading) return <ProfileSkeleton />;

  if (!profileDetails.name && !isEditing) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-[12px] md:p-[16px] bg-white rounded-[8px]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[16px] w-full">
          <div className="w-full md:flex-grow order-2 md:order-1">
            <div className="space-y-[12px] md:space-y-[16px]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[12px] md:gap-0">
                <div>
                  <p className="text-[#6B7280] italic text-[14px] md:text-base">
                    No profile information added yet
                  </p>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF]">
                    Click edit to add your details
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <ProfileActions
                    isEditing={isEditing}
                    isSaving={isSaving}
                    onSave={saveChanges}
                    onCancel={() => setIsEditing(false)}
                    onEdit={() => setIsEditing(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-end">
            <ProfileImageUploader
              file={file}
              image={image}
              isLoading={isLoading}
              onImageUpload={handleImageUpload}
              uploadProgress={uploadProgress}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-[12px] md:p-[16px] bg-white rounded-[8px]">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-[16px] w-full">
        <div className="w-full md:flex-grow order-2 md:order-1">
          {isEditing ? (
            <div className="space-y-[12px] md:space-y-[16px]">
              <ProfileForm
                profileDetails={profileDetails}
                onInputChange={handleInputChange}
                validationErrors={validationErrors}
              />
              <div className="w-full md:w-auto">
                <ProfileActions
                  isEditing={isEditing}
                  isSaving={isSaving}
                  onSave={saveChanges}
                  onCancel={() => {
                    setIsEditing(false);
                    setValidationErrors({});
                  }}
                  onEdit={() => setIsEditing(true)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-[12px] md:space-y-[16px]">
              <ProfileDisplay profileDetails={profileDetails} />
              <div className="w-full md:w-auto">
                <ProfileActions
                  isEditing={isEditing}
                  isSaving={isSaving}
                  onSave={saveChanges}
                  onCancel={() => setIsEditing(false)}
                  onEdit={() => setIsEditing(true)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-end">
          <ProfileImageUploader
            file={file}
            image={image}
            isLoading={isLoading}
            onImageUpload={handleImageUpload}
            uploadProgress={uploadProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfileHeader;