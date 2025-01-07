import { ProfileDetails } from "@/types/profile";

export const saveProfileToDatabase = async (profileData: ProfileDetails) => {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
  
    if (!response.ok) throw new Error('Failed to save profile changes');
    return response.json();
  };