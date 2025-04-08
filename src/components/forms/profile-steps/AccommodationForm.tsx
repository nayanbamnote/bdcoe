"use client"

import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { accommodationSchema } from "./types"

interface AccommodationFormProps {
  defaultValues?: z.infer<typeof accommodationSchema>
  onSubmit: (data: z.infer<typeof accommodationSchema>) => void
  onPrevious: () => void
  isSubmitting: boolean
}

const SCHOLARSHIP_YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

const HOSTEL_YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

export function AccommodationForm({ 
  defaultValues, 
  onSubmit, 
  onPrevious,
  isSubmitting
}: AccommodationFormProps) {
  const form = useForm<z.infer<typeof accommodationSchema>>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: defaultValues || {
      hasScholarship: false,
      isHosteler: false,
      scholarshipDetails: SCHOLARSHIP_YEARS.map(year => ({
        year,
        academicYear: "",
        type: "",
        criteria: "",
        amount: "",
      })),
      hostelDetails: HOSTEL_YEARS.map(year => ({
        year,
        academicYear: "",
        roomDetails: "",
        partnerDetails: "",
        transportation: "",
      })),
    },
  })

  const hasScholarship = useWatch({
    control: form.control,
    name: "hasScholarship",
  });

  const isHosteler = useWatch({
    control: form.control,
    name: "isHosteler",
  });

  const { fields: scholarshipFields } = useFieldArray({
    control: form.control,
    name: "scholarshipDetails",
  });

  const { fields: hostelFields } = useFieldArray({
    control: form.control,
    name: "hostelDetails",
  });

  // Reset details when toggles are turned off
  useEffect(() => {
    if (!hasScholarship) {
      form.setValue("scholarshipDetails", SCHOLARSHIP_YEARS.map(year => ({
        year,
        academicYear: "",
        type: "",
        criteria: "",
        amount: "",
      })));
    }
  }, [hasScholarship, form]);

  useEffect(() => {
    if (!isHosteler) {
      form.setValue("hostelDetails", HOSTEL_YEARS.map(year => ({
        year,
        academicYear: "",
        roomDetails: "",
        partnerDetails: "",
        transportation: "",
      })));
    }
  }, [isHosteler, form]);

  const handleFormSubmit = (data: z.infer<typeof accommodationSchema>) => {
    console.log("AccommodationForm - form submitted with data:", data);
    
    // If hasScholarship is false, ensure scholarshipDetails is properly formatted 
    // to avoid validation issues
    if (!data.hasScholarship) {
      data.scholarshipDetails = SCHOLARSHIP_YEARS.map(year => ({
        year,
        academicYear: "",
        type: "",
        criteria: "",
        amount: "",
      }));
    }
    
    // If isHosteler is false, ensure hostelDetails is properly formatted
    // to avoid validation issues
    if (!data.isHosteler) {
      data.hostelDetails = HOSTEL_YEARS.map(year => ({
        year,
        academicYear: "",
        roomDetails: "",
        partnerDetails: "",
        transportation: "",
      }));
    }
    
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Accommodation Details</h2>
        <p className="text-[14px] text-gray-500">
          Please provide information about your scholarship and hostel status.
        </p>

        <Card className="p-6 space-y-8">
          <FormField
            control={form.control}
            name="hasScholarship"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Scholarship Status</FormLabel>
                  <FormDescription>
                    Have you received any scholarship?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isHosteler"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Hostel Status</FormLabel>
                  <FormDescription>
                    Are you a hosteler?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Card>

        {/* Scholarship Details */}
        {hasScholarship && (
          <div className="space-y-4">
            <h3 className="text-[18px] font-semibold">Scholarship Details</h3>
            <div className="grid grid-cols-1 gap-6">
              {scholarshipFields.map((field, index) => (
                <Card key={field.id} className="p-4 relative">
                  <h4 className="text-[16px] font-semibold mb-4">{field.year}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`scholarshipDetails.${index}.academicYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic Year</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="YYYY-YY" 
                              {...field} 
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^\d-]/g, '');
                                field.onChange(value.slice(0, 7));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`scholarshipDetails.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Scholarship</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="E.g. Merit, Government, Private" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`scholarshipDetails.${index}.criteria`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Eligibility Criteria</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="E.g. Based on marks, financial status" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`scholarshipDetails.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Amount in ₹"
                              type="number"
                              {...field}
                              onChange={(e) => {
                                // Remove non-numeric characters and leading zeros
                                const numericValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '') || '';
                                field.onChange(numericValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Hostel Details */}
        {isHosteler && (
          <div className="space-y-4">
            <h3 className="text-[18px] font-semibold">Hostel Details</h3>
            <div className="grid grid-cols-1 gap-6">
              {hostelFields.map((field, index) => (
                <Card key={field.id} className="p-4 relative">
                  <h4 className="text-[16px] font-semibold mb-4">{field.year}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`hostelDetails.${index}.academicYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic Year</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="YYYY-YY" 
                              {...field} 
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^\d-]/g, '');
                                field.onChange(value.slice(0, 7));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`hostelDetails.${index}.roomDetails`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Details</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Room No., Block" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`hostelDetails.${index}.partnerDetails`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Partner</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Room Partner Name" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`hostelDetails.${index}.transportation`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transportation</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Bus/Other"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Profile"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 