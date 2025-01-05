import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/utils/adminUtils";
import { db as prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!isAdmin(email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const students = await prisma.student.findMany({
      include: {
        profile: true,
        academic: true,
        additionalDetails: true,
        guardianDetails: true,
        siblings: true,
        hobbies: true,
        academicDetails: true,
        technicalInterests: true,
        scholarship: true,
        hostel: true,
        scholarshipDetails: true,
        hostelDetails: true,
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("[ADMIN_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
