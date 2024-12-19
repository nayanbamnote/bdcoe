'use server';
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { getAuthenticatedUser, findStudentByUserId, createOrUpdateRecord } from "@/lib/dbHelpers";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUser();
    const student = await findStudentByUserId(userId);

    const body = await req.json();
    const { name, age, aadharNo, occupation, organizationAddress } = body;

    const siblingDetails = await createOrUpdateRecord(
      prisma.siblingDetails,
      { studentId: student.id },
      {
        name,
        age: parseInt(age, 10),
        aadharNo,
        occupation,
        organizationAddress,
        student: { connect: { id: student.id } },
      }
    );

    return NextResponse.json(
      {
        message: siblingDetails.updatedAt
          ? "Sibling details updated successfully."
          : "Sibling details added successfully.",
        data: siblingDetails,
      },
      { status: siblingDetails.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error handling sibling details:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
