import { Input } from "@/components/ui/input"
import { ProfileDetails } from '@/types/profile'

interface ProfileFormProps {
  profileDetails: ProfileDetails;
  onInputChange: (field: keyof ProfileDetails, value: string) => void;
}

export const ProfileForm = ({ profileDetails, onInputChange }: ProfileFormProps) => (
  <div className="space-y-[8px]">
    <Input
      value={profileDetails.name}
      onChange={(e) => onInputChange('name', e.target.value)}
      placeholder="Full Name"
      className="w-full"
    />
    <Input
      value={profileDetails.email}
      onChange={(e) => onInputChange('email', e.target.value)}
      placeholder="Email Address"
      type="email"
      className="w-full"
    />
    <Input
      value={profileDetails.phone}
      onChange={(e) => onInputChange('phone', e.target.value)}
      placeholder="Phone Number"
      type="tel"
      className="w-full"
    />
    <Input
      value={profileDetails.location}
      onChange={(e) => onInputChange('location', e.target.value)}
      placeholder="Location"
      className="w-full"
    />
  </div>
);
