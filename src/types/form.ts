import * as z from "zod";

export interface FormFieldInterface {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export interface BaseFormData {
  [key: string]: string | undefined;
}

export interface FormProps<T extends BaseFormData> {
  title: string;
  fields: FormFieldWithValidation[]; 
  data: T;
  isEditing: boolean;
  isLoading: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (field: keyof T, value: string) => void;
}

export interface AdditionalDetails extends BaseFormData {
  aadharNo: string;
  dob: string;
  bloodGroup?: string;
  addressOnAadhar: string;
  permanentAddress: string;
  casteCategory: string;
  subcaste: string;
  religion: string;
}

export interface AcademicDetails extends BaseFormData {
  rollNumber: string;
  currentSemester: string;
  section: string;
  yearOfAdmission: string;
}

export interface SiblingDetail {
  name: string;
  age: string; // Using string for form handling, will convert to number when saving
  aadharNo: string;
  occupation: string;
  organizationAddress: string;
}

export interface SiblingDetails {
  siblings: SiblingDetail[];
}

export interface GuardianDetailsInterface extends BaseFormData {
  fatherName: string;
  fatherOccupation: string;
  fatherQualification: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherQualification: string;
  motherContact: string;
}

export interface HobbyDetail extends BaseFormData {
  hobby: string;
}

export interface TechnicalInterestDetail extends BaseFormData {
  interest: string;
}

export interface FormFieldWithValidation extends FormFieldInterface {
    validation?: z.ZodSchema;
  }