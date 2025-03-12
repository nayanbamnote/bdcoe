import { ProfileDetails } from "@/types/profile";

interface ProfileDisplayProps {
  profileDetails: ProfileDetails;
}

export const ProfileDisplay = ({ profileDetails }: ProfileDisplayProps) => (
  <div className="space-y-[12px]">
    <h3 className="text-[20px] md:text-[24px] font-[600] text-gray-900">
      {profileDetails.name || 'No Name'}
    </h3>
    <div className="space-y-[8px]">
      <p className="text-[14px] md:text-[16px] text-[#4B5563]">
        {profileDetails.email || 'No Email'}
      </p>
      <p className="text-[14px] md:text-[16px] text-[#4B5563]">
        {profileDetails.phone || 'No Phone'}
      </p>
      <p className="text-[14px] md:text-[16px] text-[#4B5563]">
        {profileDetails.location || 'No Location'}
      </p>
    </div>
  </div>
);