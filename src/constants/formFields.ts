import { FormFieldWithValidation } from "@/types/form";
import * as z from "zod";

export const academicFields: FormFieldWithValidation[] = [
  { 
    key: "rollNumber", 
    label: "Roll Number", 
    placeholder: "Roll Number",
    validation: z.string()
      .min(1, "Roll number is required")
      .regex(/^\d{2}[A-Z]{3}\d{3}$/, "Invalid roll number format (e.g., 21ABC123)")
  },
  { 
    key: "currentSemester", 
    label: "Current Semester", 
    placeholder: "Current Semester",
    validation: z.string()
      .min(1, "Semester is required")
      .regex(/^[1-8]$/, "Semester must be between 1 and 8")
  },
  { 
    key: "section", 
    label: "Section", 
    placeholder: "Section",
    validation: z.string()
      .min(1, "Section is required")
      .regex(/^[A-D]$/, "Section must be A, B, C, or D")
  },
  { 
    key: "yearOfAdmission", 
    label: "Year of Admission", 
    placeholder: "Year of Admission",
    validation: z.string()
      .min(1, "Year of admission is required")
      .regex(/^20\d{2}$/, "Invalid year format (e.g., 2021)")
      .refine(
        (year) => {
          const yearNum = parseInt(year);
          const currentYear = new Date().getFullYear();
          return yearNum >= 2000 && yearNum <= currentYear;
        },
        { message: "Year must be between 2000 and current year" }
      )
  },
];

export const additionalFields: FormFieldWithValidation[] = [
  { 
    key: "aadharNo", 
    label: "Aadhar Number", 
    placeholder: "Aadhar Number",
    validation: z.string()
      .min(1, "Aadhar number is required")
      .regex(/^\d{12}$/, "Aadhar number must be 12 digits")
  },
  { 
    key: "dob", 
    label: "Date of Birth", 
    type: "date",
    validation: z.string()
      .min(1, "Date of birth is required")
      .refine(
        (date) => {
          const dob = new Date(date);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          return age >= 15 && age <= 30;
        },
        { message: "Age must be between 15 and 30 years" }
      )
  },
  { 
    key: "bloodGroup", 
    label: "Blood Group", 
    placeholder: "Blood Group",
    validation: z.string()
      .min(1, "Blood group is required")
      .regex(/^(A|B|AB|O)[+-]$/, "Invalid blood group format (e.g., A+, B-, AB+, O-)")
  },
  { 
    key: "addressOnAadhar", 
    label: "Address on Aadhar", 
    placeholder: "Address on Aadhar",
    validation: z.string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address must not exceed 200 characters")
  },
  { 
    key: "permanentAddress", 
    label: "Permanent Address", 
    placeholder: "Permanent Address",
    validation: z.string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address must not exceed 200 characters")
  },
  { 
    key: "casteCategory", 
    label: "Caste Category", 
    placeholder: "Caste Category",
    validation:z.string()
    .min(1, "Caste category is required")
    .max(20, "Caste category must not exceed 20 characters")
  },
  { 
    key: "subcaste", 
    label: "Subcaste", 
    placeholder: "Subcaste",
    validation: z.string()
      .min(1, "Subcaste is required")
      .max(50, "Subcaste must not exceed 50 characters")
  },
  { 
    key: "religion", 
    label: "Religion", 
    placeholder: "Religion",
    validation: z.string()
      .min(1, "Religion is required")
      .max(50, "Religion must not exceed 50 characters")
  },
];

export const siblingFields: FormFieldWithValidation[] = [
  { 
    key: "name", 
    label: "Name", 
    placeholder: "Sibling's Full Name",
    validation: z.string()
      .min(1, "Name is required")
      .max(100, "Name must not exceed 100 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces")
  },
  { 
    key: "age", 
    label: "Age", 
    placeholder: "Age", 
    type: "number",
    validation: z.number()
      .min(1, "Age must be at least 1")
      .max(50, "Age must not exceed 50")
  },
  { 
    key: "aadharNo", 
    label: "Aadhar Number", 
    placeholder: "XXXX-XXXX-XXXX",
    validation: z.string()
      .min(1, "Aadhar number is required")
      .regex(/^\d{12}$/, "Aadhar number must be 12 digits")
  },
  { 
    key: "occupation", 
    label: "Occupation", 
    placeholder: "Current Occupation",
    validation: z.string()
      .min(1, "Occupation is required")
      .max(100, "Occupation must not exceed 100 characters")
  },
  { 
    key: "organizationAddress", 
    label: "Organization Address", 
    placeholder: "Organization/Institution Address",
    validation: z.string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address must not exceed 200 characters")
  },
];

export const guardianFields: FormFieldWithValidation[] = [
  { 
    key: "fatherName", 
    label: "Father's Name", 
    placeholder: "Enter father's name",
    validation: z.string()
      .min(1, "Father's name is required")
      .max(100, "Name must not exceed 100 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces")
  },
  { 
    key: "fatherOccupation", 
    label: "Father's Occupation", 
    placeholder: "Enter father's occupation",
    validation: z.string()
      .min(1, "Father's occupation is required")
      .max(100, "Occupation must not exceed 100 characters")
  },
  { 
    key: "fatherQualification", 
    label: "Father's Qualification", 
    placeholder: "Enter father's qualification",
    validation: z.string()
      .min(1, "Father's qualification is required")
      .max(100, "Qualification must not exceed 100 characters")
  },
  { 
    key: "fatherContact", 
    label: "Father's Contact", 
    placeholder: "Enter father's contact number",
    validation: z.string()
      .min(1, "Contact number is required")
      .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
  },
  { 
    key: "motherName", 
    label: "Mother's Name", 
    placeholder: "Enter mother's name",
    validation: z.string()
      .min(1, "Mother's name is required")
      .max(100, "Name must not exceed 100 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces")
  },
  { 
    key: "motherOccupation", 
    label: "Mother's Occupation", 
    placeholder: "Enter mother's occupation",
    validation: z.string()
      .min(1, "Mother's occupation is required")
      .max(100, "Occupation must not exceed 100 characters")
  },
  { 
    key: "motherQualification", 
    label: "Mother's Qualification", 
    placeholder: "Enter mother's qualification",
    validation: z.string()
      .min(1, "Mother's qualification is required")
      .max(100, "Qualification must not exceed 100 characters")
  },
  { 
    key: "motherContact", 
    label: "Mother's Contact", 
    placeholder: "Enter mother's contact number",
    validation: z.string()
      .min(1, "Contact number is required")
      .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
  },
];

export const hobbyFields: FormFieldWithValidation[] = [
  { 
    key: "hobby", 
    label: "Hobby", 
    placeholder: "Enter your hobby",
    validation: z.string()
      .min(1, "Hobby is required")
      .max(100, "Hobby must not exceed 100 characters")
  },
];

export const technicalInterestFields: FormFieldWithValidation[] = [
  { 
    key: "interest", 
    label: "Technical Interest", 
    placeholder: "Enter your technical interest",
    validation: z.string()
      .min(1, "Technical interest is required")
      .max(100, "Technical interest must not exceed 100 characters")
  },
]; 