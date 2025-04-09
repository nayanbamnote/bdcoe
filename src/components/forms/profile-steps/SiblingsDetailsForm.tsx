"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
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
import { siblingsDetailsSchema, siblingSchema } from "./types"
import { Card } from "@/components/ui/card"

interface SiblingsDetailsFormProps {
  defaultValues?: z.infer<typeof siblingsDetailsSchema>
  onSubmit: (data: z.infer<typeof siblingsDetailsSchema>) => void
  onPrevious: () => void
}

export function SiblingsDetailsForm({ 
  defaultValues, 
  onSubmit, 
  onPrevious
}: SiblingsDetailsFormProps) {
  const form = useForm<z.infer<typeof siblingsDetailsSchema>>({
    resolver: zodResolver(siblingsDetailsSchema),
    defaultValues: defaultValues || {
      siblings: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "siblings",
  })

  const addSibling = () => {
    append({
      name: "",
      age: "",
      aadharNo: "",
      occupation: "",
      organizationAddress: "",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold">Siblings Details</h2>
          <Button 
            type="button" 
            onClick={addSibling}
            variant="outline"
            className="flex items-center gap-1"
          >
            <span>Add Sibling</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </Button>
        </div>

        {fields.length === 0 && (
          <div className="text-center py-8 border rounded-md border-dashed text-gray-500">
            No siblings added. Click "Add Sibling" to add information about your siblings.
          </div>
        )}

        {fields.map((field, index) => (
          <Card key={field.id} className="p-4 relative">
            <div className="absolute top-2 right-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => remove(index)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
                <span className="sr-only">Remove</span>
              </Button>
            </div>
            
            <h3 className="text-[16px] font-semibold mb-4">Sibling {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`siblings.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Sibling's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`siblings.${index}.age`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age*</FormLabel>
                    <FormControl>
                      <Input placeholder="Sibling's age" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`siblings.${index}.aadharNo`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Sibling's Aadhar number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`siblings.${index}.occupation`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Sibling's occupation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`siblings.${index}.organizationAddress`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Organization/School Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Organization or school address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        ))}

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious}>Previous</Button>
          <Button type="submit">
            {fields.length > 0 ? "Continue" : "Skip"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 