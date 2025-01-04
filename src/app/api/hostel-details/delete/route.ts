import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db as prisma } from "@/lib/db";

export async function DELETE() {
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

    // Delete all hostel details for this student
    await prisma.hostelDetails.deleteMany({
      where: { studentId: student.id }
    });

    return NextResponse.json({ message: "Hostel details deleted successfully" });
  } catch (error) {
    console.error("[HOSTEL_DETAILS_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 