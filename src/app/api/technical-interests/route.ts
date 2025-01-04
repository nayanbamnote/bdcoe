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

    const student = await prisma.student.findUnique({
      where: { 
        clerkUserId: user.id 
      },
      include: {
        technicalInterests: true,
      }
    });

    if (!student?.technicalInterests) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    return NextResponse.json({ 
      data: student.technicalInterests.map(t => ({ interest: t.interest }))
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching technical interests:", error);
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

    const { interests } = await req.json();

    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Delete existing interests
    await prisma.technicalInterestDetails.deleteMany({
      where: { studentId: student.id },
    });

    // Create new interests
    await prisma.technicalInterestDetails.createMany({
      data: interests.map((i: { interest: string }) => ({
        studentId: student.id,
        interest: i.interest,
      })),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating technical interests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 