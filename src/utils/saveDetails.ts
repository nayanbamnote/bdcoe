export const saveDetails = async (
    updatedArea: any[][],
    apiUrl: string,
    formatter: (updatedArea: any[][]) => object,
    onSuccess: (updatedArea: any[][]) => void
  ) => {
    const payload = formatter(updatedArea);
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save details.");
      }
  
      const result = await response.json();
      console.log("Details saved successfully:", result);
  
      onSuccess(updatedArea);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };
  