import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db as prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First get the student
    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id },
      include: { scholarship: true }
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return NextResponse.json({ data: student.scholarship });
  } catch (error) {
    console.error("[SCHOLARSHIP_GET]", error);
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
    const { hasScholarship } = body;

    const scholarship = await prisma.scholarship.upsert({
      where: { studentId: student.id },
      update: { hasScholarship },
      create: {
        studentId: student.id,
        hasScholarship,
      },
    });

    return NextResponse.json({ data: scholarship });
  } catch (error) {
    console.error("[SCHOLARSHIP_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 