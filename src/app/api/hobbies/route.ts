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
        hobbies: true,
      }
    });

    if (!student?.hobbies) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    return NextResponse.json({ 
      data: student.hobbies.map(h => ({ hobby: h.hobby }))
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hobbies:", error);
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

    const { hobbies } = await req.json();

    const student = await prisma.student.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Delete existing hobbies
    await prisma.hobbyDetails.deleteMany({
      where: { studentId: student.id },
    });

    // Create new hobbies
    await prisma.hobbyDetails.createMany({
      data: hobbies.map((h: { hobby: string }) => ({
        studentId: student.id,
        hobby: h.hobby,
      })),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating hobbies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 