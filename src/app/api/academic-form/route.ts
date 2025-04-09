import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Define validation schema for the academic form
const academicFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().transform(val => new Date(val)),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  contactEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  
  // Academic Background
  highSchoolName: z.string().min(1, "High school name is required"),
  highSchoolGPA: z.number().min(0).max(4.0),
  graduationYear: z.number().int().min(1900).max(2100),
  
  // Current Academic Status
  currentInstitution: z.string().optional(),
  major: z.string().optional(),
  minor: z.string().optional(),
  currentGPA: z.number().min(0).max(4.0).optional(),
  expectedGraduation: z.number().int().min(2000).max(2100).optional(),
  
  // Academic Achievements
  honors: z.array(z.string()).optional().default([]),
  scholarships: z.array(z.string()).optional().default([]),
  certifications: z.array(z.string()).optional().default([]),
  
  // Research Experience
  researchExperience: z.array(z.object({
    title: z.string(),
    institution: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string(),
  })).optional(),
  
  // Extracurricular Activities
  extracurriculars: z.array(z.object({
    activity: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string(),
  })).optional(),
  
  // Additional Information
  additionalInfo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = academicFormSchema.parse(body);
    
    // Save to database
    const academicForm = await prisma.academicForm.create({
      data: {
        userId: session.user.id,
        ...validatedData,
        status: 'submitted',
        submittedAt: new Date(),
      },
    });
    
    return NextResponse.json(
      { 
        message: 'Academic form submitted successfully',
        formId: academicForm.id
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error submitting academic form:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Validation error', 
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get user's academic forms
    const academicForms = await prisma.academicForm.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return NextResponse.json(academicForms);
    
  } catch (error) {
    console.error('Error fetching academic forms:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 