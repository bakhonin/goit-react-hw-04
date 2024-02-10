import axios from 'axios';

const Client_Id = 'nLQleSCfXKZYVHIYDSO9YDdznjfIUrAzqS8H0iNHvy0';

export const fetchImages = async (query, page) => {
  const BASE_URL = `https://api.unsplash.com/search/photos/?client_id=${Client_Id}&query=${query}&page=${page}&orientation=portrait`;
  const response = await axios.get(BASE_URL, {
    params: { page, per_page: 30 },
    headers: {
      Authorization: `Client-ID ${Client_Id}`,
    },
  });
  return {
    images: response.data.results,
    total_pages: response.data.total_pages,
  };
};
