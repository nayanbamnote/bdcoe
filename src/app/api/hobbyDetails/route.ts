'use server';
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getAuthenticatedUser, findStudentByUserId, createOrUpdateRecord } from "@/lib/dbHelpers";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUser();
    const student = await findStudentByUserId(userId);

    const body = await req.json();
    const { hobbies } = body;

    const hobbyDetails = await createOrUpdateRecord(
      prisma.hobbyDetails,
      { studentId: student.id },
      {
        hobby: hobbies,
        student: { connect: { id: student.id } },
      }
    );

    return NextResponse.json(
      {
        message: hobbyDetails.updatedAt
          ? "Hobby details updated successfully."
          : "Hobby details added successfully.",
        data: hobbyDetails,
      },
      { status: hobbyDetails.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error handling hobby details:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
