import { SingleImageDropzone } from '@/components/SingleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'

interface ProfileImageUploaderProps {
  file: File | undefined;
  image: string | null;
  isLoading: boolean;
  onImageUpload: (file: File | undefined) => Promise<void>;
  uploadProgress: number;
}

export const ProfileImageUploader = ({ 
  file, image, isLoading, onImageUpload, uploadProgress 
}: ProfileImageUploaderProps) => (
  <div className="relative group w-[176px] h-[176px]">
    {image ? (
      <div className="w-[176px] h-[176px] rounded-full overflow-hidden">
        <Image
          src={image}
          alt="Profile"
          width={176}
          height={176}
          className="object-cover w-full h-full"
          unoptimized // Add this if you're using external URLs
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
          <SingleImageDropzone
            width={176}
            height={176}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
            value={file}
            onChange={onImageUpload}
            disabled={isLoading}
          />
        </div>
      </div>
    ) : (
      <SingleImageDropzone
        width={176}
        height={176}
        className="rounded-[9999px] overflow-hidden"
        value={file}
        onChange={onImageUpload}
        disabled={isLoading}
      />
    )}
    
    {uploadProgress > 0 && uploadProgress < 100 && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[9999px]">
        <div className="text-white text-[14px]">
          {Math.round(uploadProgress)}%
        </div>
      </div>
    )}
  </div>
);
