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
      include: { hostelDetails: true }
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return NextResponse.json({ data: student.hostelDetails });
  } catch (error) {
    console.error("[HOSTEL_DETAILS_GET]", error);
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

    const body = await req.json();

    // Delete existing records for this student
    await prisma.hostelDetails.deleteMany({
      where: { studentId: student.id }
    });

    // Create new records
    const hostelDetails = await Promise.all(
      body.map((detail: any) =>
        prisma.hostelDetails.create({
          data: {
            studentId: student.id,
            year: detail.year,
            academicYear: detail.academicYear,
            roomDetails: detail.roomDetails,
            partnerDetails: detail.partnerDetails,
            transportation: detail.transportation,
          },
        })
      )
    );

    return NextResponse.json({ data: hostelDetails });
  } catch (error) {
    console.error("[HOSTEL_DETAILS_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 