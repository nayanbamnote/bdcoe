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
      aadharNo,
      dob,
      bloodGroup,
      addressOnAadhar,
      permanentAddress,
      casteCategory,
      subcaste,
      religion
    } = body;

    const studentDetails = await createOrUpdateRecord(
      prisma.studentDetails,
      { studentId: student.id },
      {
        aadharNo,
        dob: new Date(dob), // Ensure proper Date formatting
        bloodGroup,
        addressOnAadhar,
        permanentAddress,
        casteCategory,
        subcaste,
        religion,
        student: { connect: { id: student.id } },
      }
    );

    return NextResponse.json(
      {
        message: studentDetails.updatedAt
          ? "Student details updated successfully."
          : "Student details added successfully.",
        data: studentDetails,
      },
      { status: studentDetails.updatedAt ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error handling student details:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}