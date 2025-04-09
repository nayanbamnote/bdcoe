"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { studentProfileSchema } from "./types"
import { ProfileImageUploader } from "@/components/Form/ProfileComponents/ProfileImageUploader"
import { useProfileImage } from "@/hooks/useProfileImage"
import { useToast } from "@/hooks/use-toast"

interface PersonalInfoFormProps {
  defaultValues?: z.infer<typeof studentProfileSchema>
  onSubmit: (data: z.infer<typeof studentProfileSchema>) => void
}

export function PersonalInfoForm({ defaultValues, onSubmit }: PersonalInfoFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof studentProfileSchema>>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phone: "",
      location: "",
      imageUrl: "",
    },
  })

  const { file, image, uploadProgress, handleImageUpload, setFile, setImage } = useProfileImage(
    async (imageUrl) => {
      if (imageUrl) {
        form.setValue("imageUrl", imageUrl);
      }
    }
  );

  useEffect(() => {
    if (defaultValues?.imageUrl) {
      setImage(defaultValues.imageUrl);
    }
  }, [defaultValues, setImage]);

  const handleFormSubmit = (data: z.infer<typeof studentProfileSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Personal Information</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-[24px] mb-[24px]">
          <div className="order-1 md:order-2 w-full md:w-auto flex justify-center">
            <ProfileImageUploader
              file={file}
              image={image}
              isLoading={isLoading}
              onImageUpload={handleImageUpload}
              uploadProgress={uploadProgress}
            />
          </div>
          <div className="order-2 md:order-1 w-full">
            <p className="text-[14px] text-gray-500 mb-[8px]">
              Upload a profile picture (optional)
            </p>
            <p className="text-[12px] text-gray-400">
              Recommended: Square image, at least 300x300 pixels
            </p>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name*</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number*</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location*</FormLabel>
              <FormControl>
                <Input placeholder="City, State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-[16px]">
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  )
} 