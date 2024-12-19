'use server';
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getAuthenticatedUser, findStudentByUserId, createOrUpdateRecord } from "@/lib/dbHelpers";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUser();
    const student = await findStudentByUserId(userId);

    const body = await req.json();
    const {
      fatherName,
      fatherOccupation,
      fatherQualification,
      fatherContact,
      motherName,
      motherOccupation,
      motherQualification,
      motherContact,
    } = body;

    const guardianDetails = await createOrUpdateRecord(
      prisma.guardianDetails,
      { studentId: student.id },
      {
        fatherName,
        fatherOccupation,
        fatherQualification,
        fatherContact,
        motherName,
        motherOccupation,
        motherQualification,
        motherContact,
        studentId: student.id,
      }
    );

    return NextResponse.json(
      {
        message: guardianDetails.updatedAt
          ? "Guardian details updated successfully."
          : "Guardian details saved successfully.",
        data: guardianDetails,
      },
      { status: guardianDetails.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error saving guardian details:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
