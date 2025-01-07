export const urlToFile = async (url: string): Promise<File | undefined> => {
  try {
    const response = await fetch(url, {
      mode: 'no-cors'
    });
    
    const blob = await response.blob();
    return new File([blob], 'profile-image', { type: blob.type });
  } catch (error) {
    console.warn('Error converting URL to File:', error);
    return undefined;
  }
};