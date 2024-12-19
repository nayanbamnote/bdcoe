'use server';
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getAuthenticatedUser, findStudentByUserId, createOrUpdateRecord } from "@/lib/dbHelpers";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUser();
    const student = await findStudentByUserId(userId);

    const body = await req.json();
    const { name, email, phone, location } = body;

    const studentProfile = await createOrUpdateRecord(
      prisma.studentProfile,
      { studentId: student.id },
      {
        name,
        email,
        phone,
        location,
        student: { connect: { id: student.id } },
      }
    );

    return NextResponse.json(
      {
        message: studentProfile.updatedAt
          ? "Student profile updated successfully."
          : "Student profile added successfully.",
        data: studentProfile,
      },
      { status: studentProfile.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error handling student profile:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
