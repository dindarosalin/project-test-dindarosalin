// API.js

const BASE_URL = "https://suitmedia-backend.suitdev.com/api";

export const fetchIdeas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ideas`);
    if (!response.ok) {
      throw new Error("Failed to fetch ideas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching ideas:", error);
    return null;
  }
};
