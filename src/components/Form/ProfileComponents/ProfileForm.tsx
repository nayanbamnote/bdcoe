import { Input } from "@/components/ui/input"
import { ProfileDetails } from '@/types/profile'

interface ProfileFormProps {
  profileDetails: ProfileDetails;
  onInputChange: (field: keyof ProfileDetails, value: string) => void;
  validationErrors: { [K in keyof ProfileDetails]?: string };
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profileDetails,
  onInputChange,
  validationErrors
}) => {
  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={profileDetails.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          placeholder="Name"
          className={`w-full p-2 border rounded-md ${
            validationErrors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.name && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          value={profileDetails.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          placeholder="Email"
          className={`w-full p-2 border rounded-md ${
            validationErrors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          value={profileDetails.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          placeholder="Phone"
          className={`w-full p-2 border rounded-md ${
            validationErrors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.phone && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          value={profileDetails.location}
          onChange={(e) => onInputChange("location", e.target.value)}
          placeholder="Location"
          className={`w-full p-2 border rounded-md ${
            validationErrors.location ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.location && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
        )}
      </div>
    </div>
  );
};
