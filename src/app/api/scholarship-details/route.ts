import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db as prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id },
      include: { scholarshipDetails: true }
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return NextResponse.json({ data: student.scholarshipDetails });
  } catch (error) {
    console.error("[SCHOLARSHIP_DETAILS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id }
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    const scholarshipDetails = await req.json();

    // Delete existing records
    await prisma.scholarshipDetails.deleteMany({
      where: { studentId: student.id }
    });

    // Create new records
    const createdDetails = await Promise.all(
      scholarshipDetails.map((detail: any) =>
        prisma.scholarshipDetails.create({
          data: {
            studentId: student.id,
            year: detail.year,
            academicYear: detail.academicYear,
            type: detail.type,
            criteria: detail.criteria,
            amount: detail.amount,
          },
        })
      )
    );

    return NextResponse.json({ data: createdDetails });
  } catch (error) {
    console.error("[SCHOLARSHIP_DETAILS_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 