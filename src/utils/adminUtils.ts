'use server'
export const isAdmin = (email: string | null | undefined) => {
  if (!email) return false;

  // Split environment variable into an array of admin emails
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

  // Check if the provided email exists in the list
  return adminEmails.includes(email);
};