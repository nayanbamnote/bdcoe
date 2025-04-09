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
import { guardianDetailsSchema } from "./types"

interface GuardianDetailsFormProps {
  defaultValues?: z.infer<typeof guardianDetailsSchema>
  onSubmit: (data: z.infer<typeof guardianDetailsSchema>) => void
  onPrevious: () => void
  isSubmitting: boolean
}

export function GuardianDetailsForm({ 
  defaultValues, 
  onSubmit, 
  onPrevious, 
  isSubmitting 
}: GuardianDetailsFormProps) {
  const form = useForm<z.infer<typeof guardianDetailsSchema>>({
    resolver: zodResolver(guardianDetailsSchema),
    defaultValues: defaultValues || {
      fatherName: "",
      fatherOccupation: "",
      fatherQualification: "",
      fatherContact: "",
      motherName: "",
      motherOccupation: "",
      motherQualification: "",
      motherContact: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Guardian Details</h2>
        
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Name*</FormLabel>
              <FormControl>
                <Input placeholder="Father's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fatherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Father's occupation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fatherQualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Qualification</FormLabel>
              <FormControl>
                <Input placeholder="Father's qualification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fatherContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Contact*</FormLabel>
              <FormControl>
                <Input placeholder="Father's phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="motherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Name*</FormLabel>
              <FormControl>
                <Input placeholder="Mother's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="motherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Mother's occupation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="motherQualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Qualification</FormLabel>
              <FormControl>
                <Input placeholder="Mother's qualification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="motherContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Contact*</FormLabel>
              <FormControl>
                <Input placeholder="Mother's phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>Previous</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 