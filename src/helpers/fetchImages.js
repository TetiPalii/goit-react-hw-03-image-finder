const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=35862234-c36df0b3c5d22090eb9ac9504';
const page = 1;

export const fetchImages = async value => {
  const response = await fetch(
    `${BASE_URL}?${API_KEY}&q=${value}&${page}&per_page=12`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};