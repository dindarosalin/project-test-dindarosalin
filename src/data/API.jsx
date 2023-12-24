const BASE_URL = "https://suitmedia-backend.suitdev.com/api";

export const fetchIdeas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ideas`, {
      headers: {
        Accept: "application/json",
      },
    });
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

export const fetchPosts = async (pageNumber = 1, pageSize = 10) => {
  const queryParams = `page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=-published_at`;

  try {
    const response = await fetch(`${BASE_URL}/ideas?${queryParams}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};
