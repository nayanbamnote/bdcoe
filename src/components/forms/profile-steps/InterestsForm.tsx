"use client"

import { useState } from "react"
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
import { interestsSchema } from "./types"
import { Card } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

interface InterestsFormProps {
  defaultValues?: z.infer<typeof interestsSchema>
  onSubmit: (data: z.infer<typeof interestsSchema>) => void
  onPrevious: () => void
  isSubmitting: boolean
}

export function InterestsForm({
  defaultValues,
  onSubmit,
  onPrevious,
  isSubmitting
}: InterestsFormProps) {
  const [newHobby, setNewHobby] = useState("")
  const [newTechnicalInterest, setNewTechnicalInterest] = useState("")

  const form = useForm<z.infer<typeof interestsSchema>>({
    resolver: zodResolver(interestsSchema),
    defaultValues: defaultValues || {
      hobbies: [],
      technicalInterests: [],
    },
  })

  const watchHobbies = form.watch("hobbies")
  const watchTechnicalInterests = form.watch("technicalInterests")

  const addHobby = () => {
    if (newHobby.trim() !== "" && !watchHobbies.includes(newHobby.trim())) {
      form.setValue("hobbies", [...watchHobbies, newHobby.trim()])
      setNewHobby("")
    }
  }

  const removeHobby = (hobby: string) => {
    form.setValue(
      "hobbies",
      watchHobbies.filter(h => h !== hobby)
    )
  }

  const addTechnicalInterest = () => {
    if (newTechnicalInterest.trim() !== "" && !watchTechnicalInterests.includes(newTechnicalInterest.trim())) {
      form.setValue("technicalInterests", [...watchTechnicalInterests, newTechnicalInterest.trim()])
      setNewTechnicalInterest("")
    }
  }

  const removeTechnicalInterest = (interest: string) => {
    form.setValue(
      "technicalInterests",
      watchTechnicalInterests.filter(i => i !== interest)
    )
  }

  const handleHobbyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addHobby()
    }
  }

  const handleTechnicalInterestKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechnicalInterest()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
        <h2 className="text-[20px] font-bold">Hobbies & Technical Interests</h2>

        <Card className="p-4">
          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobbies*</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Add a hobby"
                      value={newHobby}
                      onChange={(e) => setNewHobby(e.target.value)}
                      onKeyDown={handleHobbyKeyDown}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addHobby}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {watchHobbies.length === 0 && (
                    <p className="text-sm text-gray-500">No hobbies added yet</p>
                  )}
                  {watchHobbies.map((hobby, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded-full px-3 py-1 text-sm flex items-center gap-1"
                    >
                      <span>{hobby}</span>
                      <button
                        type="button"
                        onClick={() => removeHobby(hobby)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {hobby}</span>
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="p-4">
          <FormField
            control={form.control}
            name="technicalInterests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Interests*</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Add a technical interest"
                      value={newTechnicalInterest}
                      onChange={(e) => setNewTechnicalInterest(e.target.value)}
                      onKeyDown={handleTechnicalInterestKeyDown}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTechnicalInterest}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {watchTechnicalInterests.length === 0 && (
                    <p className="text-sm text-gray-500">No technical interests added yet</p>
                  )}
                  {watchTechnicalInterests.map((interest, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded-full px-3 py-1 text-sm flex items-center gap-1"
                    >
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnicalInterest(interest)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {interest}</span>
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

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