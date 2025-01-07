import { useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore'
import { useToast } from "@/hooks/use-toast"

export const useProfileImage = (onSave: (imageUrl: string | null) => Promise<void>) => {
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File | undefined) => {
    try {
      if (!file) {
        setImage(null);
        await onSave(null);
        return;
      }

      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => setUploadProgress(progress),
        options: { temporary: true },
      });

      setImage(res.url);
      setFile(file);
      await onSave(res.url);
      
      await edgestore.publicFiles.confirmUpload({
        url: res.url,
      });

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadProgress(0);
    }
  };

  return { file, image, uploadProgress, handleImageUpload, setFile, setImage };
};