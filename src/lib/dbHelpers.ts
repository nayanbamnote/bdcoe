import { db as prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getAuthenticatedUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

export async function findStudentByUserId(userId: string) {
  const student = await prisma.student.findUnique({
    where: { clerkUserId: userId },
  });
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
}

export async function createOrUpdateRecord(model: any, where: object, data: object) {
  const existingRecord = await model.findUnique({ where });
  if (existingRecord) {
    return await model.update({ where, data });
  } else {
    return await model.create({ data });
  }
}
