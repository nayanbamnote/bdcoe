import { prisma } from './prisma';

export async function createAcademicForm(data: any, userId: string) {
  return await prisma.academicForm.create({
    data: {
      userId,
      ...data,
      status: 'submitted',
      submittedAt: new Date(),
    },
  });
}

export async function getAcademicFormById(formId: string) {
  return await prisma.academicForm.findUnique({
    where: {
      id: formId,
    },
  });
}

export async function getUserAcademicForms(userId: string) {
  return await prisma.academicForm.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function updateAcademicForm(formId: string, data: any) {
  return await prisma.academicForm.update({
    where: {
      id: formId,
    },
    data,
  });
}

export async function deleteAcademicForm(formId: string) {
  return await prisma.academicForm.delete({
    where: {
      id: formId,
    },
  });
}

export async function saveAcademicFormDraft(data: any, userId: string) {
  return await prisma.academicForm.create({
    data: {
      userId,
      ...data,
      status: 'draft',
    },
  });
}

export async function updateAcademicFormDraft(formId: string, data: any) {
  return await prisma.academicForm.update({
    where: {
      id: formId,
    },
    data: {
      ...data,
      status: 'draft',
    },
  });
}

export async function submitAcademicForm(formId: string) {
  return await prisma.academicForm.update({
    where: {
      id: formId,
    },
    data: {
      status: 'submitted',
      submittedAt: new Date(),
    },
  });
} 