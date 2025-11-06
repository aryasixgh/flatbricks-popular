import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const fetchPopularProperties = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/properties-popular`, {
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

export const postProperty = async (propertyData: any) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/post-properties`,
      propertyData,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err) {
    console.log("Error posting properties ", err);
    return { success: false, message: "Failed to add property" };
  }
};
