'use server';
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db as prisma } from "@/lib/db";



export async function POST(req: NextRequest) {
  try {
    // Extract Clerk userId from Clerk authentication middleware
    const { userId: clerkUserId } = getAuth(req);

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Unauthorized. Clerk userId not found." },
        { status: 401 }
      );
    }

    // Check if student with the given clerkUserId already exists
    const existingStudent = await prisma.student.findUnique({
      where: { clerkUserId },
    });

    if (existingStudent) {
      return NextResponse.json(
        { message: "Student already exists" },
        { status: 200 }
      );
    }

    // Create a new Student record with empty relations
    const newStudent = await prisma.student.create({
      data: {
        clerkUserId,
      },
    });

    return NextResponse.json(
      { message: "Student created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
