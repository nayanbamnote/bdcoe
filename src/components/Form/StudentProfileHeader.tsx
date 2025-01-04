"use client"
import React, { useState, useEffect } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileDetails {
  name: string;
  email: string;
  phone: string;
  location: string;
}

const StudentProfileHeader = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const { data } = await response.json();
        
        // Check if data exists and update profile details
        if (data) {
          setProfileDetails({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || ""
          });
          // If there's an image URL, set it
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
  }, [toast]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(prev => !prev);
    if (!profileDetails.name) {
      setProfileDetails({
        name: "",
        email: "",
        phone: "",
        location: ""
      });
    }
  };

  const handleInputChange = (field: keyof ProfileDetails, value: string) => {
    setProfileDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileDetails),
      });

      if (!response.ok) throw new Error('Failed to save changes');

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

  const cancelEditing = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // If no profile data exists, show empty state with edit button
  if (!profileDetails.name && !isEditing) {
    return (
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-4 w-full">
          <div className="flex-grow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 italic">No profile information added yet</p>
                  <p className="text-sm text-gray-400">Click edit to add your details</p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleEditMode}
                  className="hover:bg-gray-100"
                >
                  <Pencil size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Profile Image Placeholder */}
          <div className="relative group size-44">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-sm">
              Upload Photo
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        {/* Profile Details Section */}
        <div className="flex-grow">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={profileDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Full Name"
                className="w-full"
              />
              <Input
                value={profileDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email Address"
                type="email"
                className="w-full"
              />
              <Input
                value={profileDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone Number"
                type="tel"
                className="w-full"
              />
              <Input
                value={profileDetails.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Location"
                className="w-full"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{profileDetails.name || 'No Name'}</h3>
              <p className="text-gray-600">{profileDetails.email || 'No Email'}</p>
              <p className="text-gray-600">{profileDetails.phone || 'No Phone'}</p>
              <p className="text-gray-600">{profileDetails.location || 'No Location'}</p>
            </div>
          )}
        </div>

        {/* Edit/Save Actions */}
        <div className="flex flex-col items-center space-y-2">
          {isEditing ? (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={cancelEditing}
                className="hover:bg-red-50"
              >
                <X className="size-5 text-red-500" />
              </Button>
              <Button 
                onClick={saveChanges}
                className="flex items-center gap-2"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleEditMode}
              className="hover:bg-gray-100"
            >
              <Pencil size={18} />
            </Button>
          )}
        </div>

        {/* Profile Image Section */}
        <div className="relative group size-44">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
              Upload Photo
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  )
}

// Skeleton component for loading state
const ProfileSkeleton = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        <div className="flex-grow space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex-shrink-0">
          <Skeleton className="h-44 w-44 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default StudentProfileHeader