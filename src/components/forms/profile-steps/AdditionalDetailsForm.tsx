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
import { additionalDetailsSchema } from "./types"

interface AdditionalDetailsFormProps {
  defaultValues?: z.infer<typeof additionalDetailsSchema>
  onSubmit: (data: z.infer<typeof additionalDetailsSchema>) => void
  onPrevious: () => void
}

export function AdditionalDetailsForm({ defaultValues, onSubmit, onPrevious }: AdditionalDetailsFormProps) {
  const form = useForm<z.infer<typeof additionalDetailsSchema>>({
    resolver: zodResolver(additionalDetailsSchema),
    defaultValues: defaultValues || {
      aadharNo: "",
      dob: "",
      bloodGroup: "",
      addressOnAadhar: "",
      permanentAddress: "",
      casteCategory: "",
      subcaste: "",
      religion: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Additional Details</h2>
        
        <FormField
          control={form.control}
          name="aadharNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Number*</FormLabel>
              <FormControl>
                <Input placeholder="12-digit Aadhar number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth*</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <FormControl>
                <Input placeholder="e.g. A+" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="addressOnAadhar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address on Aadhar*</FormLabel>
              <FormControl>
                <Input placeholder="Address as on Aadhar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="permanentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permanent Address (if different)</FormLabel>
              <FormControl>
                <Input placeholder="Permanent address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="casteCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caste Category*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. General, OBC, SC, ST" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subcaste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcaste (if applicable)</FormLabel>
              <FormControl>
                <Input placeholder="Subcaste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion*</FormLabel>
              <FormControl>
                <Input placeholder="Your religion" {...field} />
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