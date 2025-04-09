"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
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
import { Card } from "@/components/ui/card"
import { academicHistorySchema, academicRecordSchema } from "./types"

interface AcademicHistoryFormProps {
  defaultValues?: z.infer<typeof academicHistorySchema>
  onSubmit: (data: z.infer<typeof academicHistorySchema>) => void
  onPrevious: () => void
  isSubmitting: boolean
}

const ACADEMIC_LABELS = [
  "SSC",
  "HSC/Diploma",
  "1-Sem",
  "2-Sem",
  "3-Sem",
  "4-Sem",
  "5-Sem",
  "6-Sem",
  "7-Sem",
  "8-Sem",
];

export function AcademicHistoryForm({ 
  defaultValues, 
  onSubmit, 
  onPrevious,
  isSubmitting
}: AcademicHistoryFormProps) {
  // Initialize form with default values or empty array
  const form = useForm<z.infer<typeof academicHistorySchema>>({
    resolver: zodResolver(academicHistorySchema),
    defaultValues: defaultValues || {
      academicRecords: ACADEMIC_LABELS.map(label => ({
        label,
        year: "",
        totalMarks: 0,
        outOfMarks: 0,
        percentage: "0.00",
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "academicRecords",
  })

  // Auto-calculate percentage when marks change
  const calculatePercentage = (index: number) => {
    const totalMarks = form.getValues(`academicRecords.${index}.totalMarks`);
    const outOfMarks = form.getValues(`academicRecords.${index}.outOfMarks`);
    
    if (totalMarks > 0 && outOfMarks > 0) {
      const percentage = (totalMarks / outOfMarks) * 100;
      form.setValue(`academicRecords.${index}.percentage`, percentage.toFixed(2));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Academic History</h2>
        <p className="text-[14px] text-gray-500">
          Please provide details about your academic history and performance.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4 relative">
              <h3 className="text-[16px] font-semibold mb-4">{field.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`academicRecords.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
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
                  name={`academicRecords.${index}.totalMarks`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marks Obtained</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="0" 
                          type="number"
                          min="0"
                          max="800"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            field.onChange(value);
                            setTimeout(() => calculatePercentage(index), 10);
                          }} 
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`academicRecords.${index}.outOfMarks`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Out Of</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="0" 
                          type="number"
                          min="0"
                          max="800"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            field.onChange(value);
                            setTimeout(() => calculatePercentage(index), 10);
                          }} 
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`academicRecords.${index}.percentage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percentage</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          ))}
        </div>

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