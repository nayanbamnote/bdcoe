'use server'

export const isAdmin = async (email: string | null | undefined) => {
  if (!email) return false;

  // Split environment variable into an array of admin emails and trim whitespace
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
  
  // Add additional check for NEXT_PUBLIC_ADMIN_EMAIL
  const publicAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim();
  if (publicAdminEmail) {
    adminEmails.push(publicAdminEmail);
  }

  // Check if the provided email exists in the list (case insensitive)
  return adminEmails.some(adminEmail => 
    adminEmail.toLowerCase() === email.toLowerCase()
  );
};