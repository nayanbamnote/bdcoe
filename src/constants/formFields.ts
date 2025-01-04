import { FormFieldInterface } from "@/types/form";

export const academicFields: FormFieldInterface[] = [
  { key: "rollNumber", label: "Roll Number", placeholder: "Roll Number" },
  { key: "currentSemester", label: "Current Semester", placeholder: "Current Semester" },
  { key: "section", label: "Section", placeholder: "Section" },
  { key: "yearOfAdmission", label: "Year of Admission", placeholder: "Year of Admission" },
];

export const additionalFields: FormFieldInterface[] = [
  { key: "aadharNo", label: "Aadhar Number", placeholder: "Aadhar Number" },
  { key: "dob", label: "Date of Birth", type: "date" },
  { key: "bloodGroup", label: "Blood Group", placeholder: "Blood Group" },
  { key: "addressOnAadhar", label: "Address on Aadhar", placeholder: "Address on Aadhar" },
  { key: "permanentAddress", label: "Permanent Address", placeholder: "Permanent Address" },
  { key: "casteCategory", label: "Caste Category", placeholder: "Caste Category" },
  { key: "subcaste", label: "Subcaste", placeholder: "Subcaste" },
  { key: "religion", label: "Religion", placeholder: "Religion" },
]; 