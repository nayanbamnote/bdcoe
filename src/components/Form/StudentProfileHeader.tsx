"use client"
import React, { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { ProfileDetails } from '@/types/profile'
import { urlToFile } from '@/utils/file-utils'
import { saveProfileToDatabase } from '@/utils/profile-utils'
import { ProfileImageUploader } from '@/components/Form/ProfileComponents/ProfileImageUploader'
import { ProfileForm } from '@/components/Form/ProfileComponents/ProfileForm'
import { ProfileDisplay } from '@/components/Form/ProfileComponents/ProfileDisplay'
import { ProfileActions } from '@/components/Form/ProfileComponents/ProfileActions'
import { ProfileSkeleton } from '@/components/Form/ProfileComponents/ProfileSkeleton'
import { useProfileImage } from '@/hooks/useProfileImage'

const StudentProfileHeader = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    email: "",
    phone: "",
    location: "",
    imageUrl: null
  });

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

  const handleInputChange = (field: keyof ProfileDetails, value: string) => {
    setProfileDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      await saveProfileToDatabase(profileDetails);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  if (!profileDetails.name && !isEditing) {
    return (
      <div className="flex justify-between items-center p-[16px] bg-white rounded-[8px]">
        <div className="flex items-center space-x-[16px] w-full">
          <div className="flex-grow">
            <div className="space-y-[16px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] italic">No profile information added yet</p>
                  <p className="text-[14px] text-[#9CA3AF]">Click edit to add your details</p>
                </div>
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
          <ProfileImageUploader
            file={file}
            image={image}
            isLoading={isLoading}
            onImageUpload={handleImageUpload}
            uploadProgress={uploadProgress}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-[16px] bg-white rounded-[8px]">
      <div className="flex items-center space-x-[16px] w-full">
        <div className="flex-grow">
          {isEditing ? (
            <ProfileForm
              profileDetails={profileDetails}
              onInputChange={handleInputChange}
            />
          ) : (
            <ProfileDisplay profileDetails={profileDetails} />
          )}
        </div>
        <ProfileActions
          isEditing={isEditing}
          isSaving={isSaving}
          onSave={saveChanges}
          onCancel={() => setIsEditing(false)}
          onEdit={() => setIsEditing(true)}
        />
        <ProfileImageUploader
          file={file}
          image={image}
          isLoading={isLoading}
          onImageUpload={handleImageUpload}
          uploadProgress={uploadProgress}
        />
      </div>
    </div>
  );
};

export default StudentProfileHeader;