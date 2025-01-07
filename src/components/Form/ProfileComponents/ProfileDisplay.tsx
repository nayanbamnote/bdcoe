import { ProfileDetails } from "@/types/profile";

interface ProfileDisplayProps {
    profileDetails: ProfileDetails;
  }
  
  export const ProfileDisplay = ({ profileDetails }: ProfileDisplayProps) => (
    <div className="space-y-[8px]">
      <h3 className="text-[26px] font-[600]">{profileDetails.name || 'No Name'}</h3>
      <p className="text-[#4B5563] text-[16px]">{profileDetails.email || 'No Email'}</p>
      <p className="text-[#4B5563] text-[16px]">{profileDetails.phone || 'No Phone'}</p>
      <p className="text-[#4B5563] text-[16px]">{profileDetails.location || 'No Location'}</p>
    </div>
  );