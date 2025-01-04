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

export const siblingFields: FormFieldInterface[] = [
  { key: "name", label: "Name", placeholder: "Sibling's Full Name" },
  { key: "age", label: "Age", placeholder: "Age", type: "number" },
  { key: "aadharNo", label: "Aadhar Number", placeholder: "XXXX-XXXX-XXXX" },
  { key: "occupation", label: "Occupation", placeholder: "Current Occupation" },
  { key: "organizationAddress", label: "Organization Address", placeholder: "Organization/Institution Address" },
];

export const guardianFields: FormFieldInterface[] = [
  { key: "fatherName", label: "Father's Name", placeholder: "Enter father's name" },
  { key: "fatherOccupation", label: "Father's Occupation", placeholder: "Enter father's occupation" },
  { key: "fatherQualification", label: "Father's Qualification", placeholder: "Enter father's qualification" },
  { key: "fatherContact", label: "Father's Contact", placeholder: "Enter father's contact number" },
  { key: "motherName", label: "Mother's Name", placeholder: "Enter mother's name" },
  { key: "motherOccupation", label: "Mother's Occupation", placeholder: "Enter mother's occupation" },
  { key: "motherQualification", label: "Mother's Qualification", placeholder: "Enter mother's qualification" },
  { key: "motherContact", label: "Mother's Contact", placeholder: "Enter mother's contact number" },
];

export const hobbyFields: FormFieldInterface[] = [
  { key: "hobby", label: "Hobby", placeholder: "Enter your hobby" },
];

export const technicalInterestFields: FormFieldInterface[] = [
  { key: "interest", label: "Technical Interest", placeholder: "Enter your technical interest" },
]; 