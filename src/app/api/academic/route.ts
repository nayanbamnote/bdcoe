import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the student record with academic info
    const student = await prisma.student.findUnique({
      where: { 
        clerkUserId: user.id 
      },
      include: {
        academic: true,
      }
    });

    // If student exists but no academic info, return null
    if (!student?.academic) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    // Return the academic data directly
    return NextResponse.json({ data: student.academic }, { status: 200 });
  } catch (error) {
    console.error("Error fetching academic info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Find or create student record
    let student = await prisma.student.upsert({
      where: { 
        clerkUserId: user.id 
      },
      update: {},
      create: {
        clerkUserId: user.id,
      },
    });

    // Update or create academic info
    const academic = await prisma.academicInfo.upsert({
      where: {
        studentId: student.id,
      },
      update: {
        rollNumber: body.rollNumber,
        currentSemester: body.currentSemester,
        section: body.section,
        yearOfAdmission: body.yearOfAdmission,
      },
      create: {
        studentId: student.id,
        rollNumber: body.rollNumber,
        currentSemester: body.currentSemester,
        section: body.section,
        yearOfAdmission: body.yearOfAdmission,
      },
    });

    return NextResponse.json(
      { 
        message: "Academic information updated successfully",
        data: academic 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating academic info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 