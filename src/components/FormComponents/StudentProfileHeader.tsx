import React, { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const StudentProfileHeader = () => {
  // State for image and profile details
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for editable fields
  const [profileDetails, setProfileDetails] = useState({
    name: "Nayan Bamnote",
    email: "nareshbamnote@gmail.com",
    phone: "+91 9999999999",
    location: "Pulgaon"
  });

  // Handle image upload
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

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (field: keyof typeof profileDetails, value: string) => {
    setProfileDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const response = await fetch('/api/studentProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save profile details');
      }
  
      const result = await response.json();
      console.log('Profile saved:', result);
  
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };  

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    // Reset to original details if needed
    setProfileDetails({
      name: "Nayan Bamnote",
      email: "nareshbamnote@gmail.com",
      phone: "+91 9999999999",
      location: "Pulgaon"
    });
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        {/* Profile Details Section */}
        <div className="flex-grow">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={profileDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Name"
                className="w-full"
              />
              <Input
                value={profileDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email"
                className="w-full"
              />
              <Input
                value={profileDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone"
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
            <div>
              <p className="text-xl font-semibold">{profileDetails.name}</p>
              <p>{profileDetails.email}</p>
              <p>{profileDetails.phone}</p>
              <p>{profileDetails.location}</p>
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
              >
                <Save className="h-4 w-4" />
                Save
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

export default StudentProfileHeader