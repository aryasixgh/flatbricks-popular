export const fetchPopularProperties = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/properties-popular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    // Ensure it's always an array before returning
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching popular properties:", err);
    return []; // Return empty array on error so frontend doesn't crash
  }
};
