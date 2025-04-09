"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { academicInfoSchema } from "./types"

interface AcademicInfoFormProps {
  defaultValues?: z.infer<typeof academicInfoSchema>
  onSubmit: (data: z.infer<typeof academicInfoSchema>) => void
  onPrevious: () => void
}

export function AcademicInfoForm({ defaultValues, onSubmit, onPrevious }: AcademicInfoFormProps) {
  const form = useForm<z.infer<typeof academicInfoSchema>>({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: defaultValues || {
      college_id: "",
      rollNumber: "",
      currentSemester: "",
      section: "",
      yearOfAdmission: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Academic Information</h2>
        
        <FormField
          control={form.control}
          name="college_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College ID*</FormLabel>
              <FormControl>
                <Input placeholder="Your college ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rollNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll Number*</FormLabel>
              <FormControl>
                <Input placeholder="Your roll number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="currentSemester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Semester*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="yearOfAdmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Admission*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>Previous</Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  )
} 