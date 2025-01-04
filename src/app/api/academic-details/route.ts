import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const student = await db.student.findUnique({
      where: { clerkUserId: user.id },
      include: {
        academicDetails: true,
      },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return NextResponse.json({ data: student.academicDetails });
  } catch (error) {
    console.error("[ACADEMIC_DETAILS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const student = await db.student.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    // Delete existing records for this student
    await db.academicDetails.deleteMany({
      where: { studentId: student.id },
    });

    // Create new records
    const academicDetails = await Promise.all(
      body.map((detail: any) =>
        db.academicDetails.create({
          data: {
            studentId: student.id,
            label: detail.label,
            year: detail.year,
            totalMarks: detail.totalMarks,
            outOfMarks: detail.outOfMarks,
            percentage: detail.percentage,
          },
        })
      )
    );

    return NextResponse.json({ data: academicDetails });
  } catch (error) {
    console.error("[ACADEMIC_DETAILS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 