'use server';
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getAuthenticatedUser, findStudentByUserId, createOrUpdateRecord } from "@/lib/dbHelpers";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUser();
    const student = await findStudentByUserId(userId);

    const body = await req.json();
    const { studentID, currentSemester, section, yearOfAdmission } = body;

    const additionalDetails = await createOrUpdateRecord(
      prisma.additionalStudentDetails,
      { studentId: student.id },
      {
        studentID,
        currentSemester,
        section,
        yearOfAdmission,
        student: { connect: { id: student.id } },
      }
    );

    return NextResponse.json(
      {
        message: additionalDetails.updatedAt
          ? "Additional student details updated successfully."
          : "Additional student details added successfully.",
        data: additionalDetails,
      },
      { status: additionalDetails.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error handling additional student details:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}