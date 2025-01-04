import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {db as prisma} from "@/lib/db";

export async function GET() {
  try {
    const user  = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id },
      include: { hostel: true }
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return NextResponse.json({ data: student.hostel });
  } catch (error) {
    console.error("[HOSTEL_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user  = await currentUser();

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
    const { isHosteler } = body;

    const hostel = await prisma.hostel.upsert({
      where: { studentId: student.id },
      update: { isHosteler },
      create: {
        studentId: student.id,
        isHosteler,
      },
    });

    return NextResponse.json({ data: hostel });
  } catch (error) {
    console.error("[HOSTEL_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 