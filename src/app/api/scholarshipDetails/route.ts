'use server';
import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    // Authenticate and get the user ID
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const scholarshipDetails = await request.json();
    console.log('Received body:', scholarshipDetails);

    // Find the student
    const student = await prisma.student.findUnique({
      where: { clerkUserId: userId }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Delete existing records first
    await prisma.scholarshipDetails.deleteMany({
      where: { studentId: student.id }
    });

    // Create new records one by one to better handle potential errors
    const createdRecords = await Promise.all(
      scholarshipDetails.map(detail =>
        prisma.scholarshipDetails.create({
          data: {
            academicYear: String(detail.academicYear),
            type: String(detail.type),
            criteria: String(detail.criteria),
            amount: String(detail.amount),
            studentId: student.id,
          },
        })
      )
    );

    return NextResponse.json({
      message: 'Scholarship details saved successfully',
      count: createdRecords.length,
    }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({
      error: 'Failed to save scholarship details',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
