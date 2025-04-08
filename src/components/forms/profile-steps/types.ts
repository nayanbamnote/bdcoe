import * as z from "zod"

// Form schemas for each step
export const studentProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be valid" }).max(15),
  location: z.string().min(2, { message: "Location is required" }),
  imageUrl: z.string().optional(),
})

export const academicInfoSchema = z.object({
  college_id: z.string().min(2, { message: "College ID is required" }),
  rollNumber: z.string().min(2, { message: "Roll number is required" }),
  currentSemester: z.string().min(1, { message: "Current semester is required" }),
  section: z.string().min(1, { message: "Section is required" }),
  yearOfAdmission: z.string().min(4, { message: "Year of admission is required" }),
})

export const additionalDetailsSchema = z.object({
  aadharNo: z.string()
    .min(12, { message: "Aadhar number must be 12 digits" })
    .max(12, { message: "Aadhar number must be 12 digits" })
    .refine(val => /^\d+$/.test(val), { message: "Aadhar number must contain only digits" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  bloodGroup: z.string().optional(),
  addressOnAadhar: z.string().min(5, { message: "Aadhar address is required" }),
  permanentAddress: z.string().optional(),
  casteCategory: z.string().min(1, { message: "Caste category is required" }),
  subcaste: z.string().optional(),
  religion: z.string().min(1, { message: "Religion is required" }),
})

export const guardianDetailsSchema = z.object({
  fatherName: z.string().min(2, { message: "Father's name is required" }),
  fatherOccupation: z.string().optional(),
  fatherQualification: z.string().optional(),
  fatherContact: z.string()
    .min(10, { message: "Father's contact must be at least 10 digits" })
    .max(15)
    .refine(val => /^\d+$/.test(val), { message: "Phone number must contain only digits" }),
  motherName: z.string().min(2, { message: "Mother's name is required" }),
  motherOccupation: z.string().optional(),
  motherQualification: z.string().optional(),
  motherContact: z.string()
    .min(10, { message: "Mother's contact must be at least 10 digits" })
    .max(15)
    .refine(val => /^\d+$/.test(val), { message: "Phone number must contain only digits" }),
})

// Schema for a single sibling's details
export const siblingSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  age: z.string().min(1, { message: "Age is required" })
    .refine(val => !isNaN(Number(val)), { message: "Age must be a number" }),
  aadharNo: z.string()
    .min(12, { message: "Aadhar number must be 12 digits" })
    .max(12, { message: "Aadhar number must be 12 digits" })
    .refine(val => /^\d+$/.test(val), { message: "Aadhar number must contain only digits" })
    .optional(),
  occupation: z.string().optional(),
  organizationAddress: z.string().optional(),
})

// Schema for the siblings form which contains an array of sibling details
export const siblingsDetailsSchema = z.object({
  siblings: z.array(siblingSchema).optional().default([]),
})

// Schema for hobbies and technical interests
export const interestsSchema = z.object({
  hobbies: z.array(z.string()).min(1, { message: "Add at least one hobby" }),
  technicalInterests: z.array(z.string()).min(1, { message: "Add at least one technical interest" }),
})

// Schema for a single academic history entry
export const academicRecordSchema = z.object({
  label: z.string().min(1, { message: "Examination label is required" }),
  year: z.string().optional(),
  totalMarks: z.number().min(0, { message: "Total marks must be positive" }).max(800, { message: "Maximum marks allowed is 800" }),
  outOfMarks: z.number().min(0, { message: "Out of marks must be positive" }).max(800, { message: "Maximum marks allowed is 800" }),
  percentage: z.string(),
}).refine(data => data.totalMarks <= data.outOfMarks, {
  message: "Total marks cannot be greater than out of marks",
  path: ["totalMarks"],
});

// Schema for the academic history form which contains an array of academic records
export const academicHistorySchema = z.object({
  academicRecords: z.array(academicRecordSchema)
    .min(1, { message: "Add at least one academic record" }),
})

// Schema for accommodation details
export const accommodationSchema = z.object({
  hasScholarship: z.boolean().default(false),
  isHosteler: z.boolean().default(false),
  scholarshipDetails: z.array(
    z.object({
      year: z.string(),
      academicYear: z.string().optional(),
      type: z.string().min(1, { message: "Scholarship type is required" }),
      criteria: z.string().min(1, { message: "Eligibility criteria is required" }),
      amount: z.string().regex(/^\d+$/, "Amount must be a valid number")
        .refine(
          (val) => {
            const num = parseInt(val);
            return num > 0 && num <= 1000000;
          },
          "Amount must be between 1 and 10,00,000"
        ).optional(),
    })
  ).optional(),
  hostelDetails: z.array(
    z.object({
      year: z.string(),
      academicYear: z.string().optional(),
      roomDetails: z.string().regex(/^[A-Za-z0-9\s,-]*$/, "Room details can only contain letters, numbers, spaces, commas and hyphens"),
      partnerDetails: z.string().regex(/^[A-Za-z\s.]*$/, "Partner name can only contain letters, spaces and dots"),
      transportation: z.string().regex(/^[A-Za-z0-9\s/-]*$/, "Transportation details can only contain letters, numbers, spaces, slashes and hyphens"),
    })
  ).optional(),
})

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type FormData = {
  profile?: z.infer<typeof studentProfileSchema>;
  academic?: z.infer<typeof academicInfoSchema>;
  additional?: z.infer<typeof additionalDetailsSchema>;
  guardian?: z.infer<typeof guardianDetailsSchema>;
  siblings?: z.infer<typeof siblingsDetailsSchema>;
  interests?: z.infer<typeof interestsSchema>;
  academicHistory?: z.infer<typeof academicHistorySchema>;
  accommodation?: z.infer<typeof accommodationSchema>;
} 