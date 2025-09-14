export const fetchSummary = async (id: string) => {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/summary/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // optional (avoid caching issues)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch summary");
    }

    const data = await response.json();
    return data; // <-- parsed JSON
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return { success: false };
  }
};
export const DeleteSummary = async (id: string) => {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/summary/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // optional (avoid caching issues)
    });

    if (!response.ok) {
      throw new Error("Failed to delete summary");
    }

    const data = await response.json();
    return data; // <-- parsed JSON
  } catch (error) {
    console.error("Error deleting summaries:", error);
    return { success: false };
  }
};
