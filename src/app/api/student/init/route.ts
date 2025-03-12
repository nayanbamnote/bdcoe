import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Create student record if it doesn't exist
    const student = await prisma.student.upsert({
      where: { 
        clerkUserId: user.id 
      },
      update: {},
      create: {
        clerkUserId: user.id,
      },
    });

    return NextResponse.json({ data: student }, { status: 200 });
  } catch (error) {
    console.error("Error initializing student:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 