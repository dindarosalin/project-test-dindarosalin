const BASE_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';

const fetchPosts = async (page = 1, perPage = 10, sortBy = 'published_at') => {
  const apiUrl = `${BASE_URL}?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sortBy}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};


export { fetchPosts };
