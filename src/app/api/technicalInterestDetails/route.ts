'use server';
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getAuthenticatedUser, findStudentByUserId, createOrUpdateRecord } from "@/lib/dbHelpers";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUser();
    const student = await findStudentByUserId(userId);

    const body = await req.json();
    const { interest } = body;

    const interestDetails = await createOrUpdateRecord(
      prisma.technicalInterestDetails,
      { studentId: student.id },
      {
        interest: interest,
        student: { connect: { id: student.id } },
      }
    );

    return NextResponse.json(
      {
        message: interestDetails.updatedAt
          ? "Technical interest updated successfully."
          : "Technical interest added successfully.",
        data: interestDetails,
      },
      { status: interestDetails.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error handling technical interest:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
