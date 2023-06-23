const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=35862234-c36df0b3c5d22090eb9ac9504';
// const page = 1;

export const fetchImages = async (value, page) => {
  // console.log(page);
  const response = await fetch(
    `${BASE_URL}?q=${value}&page=${page}&${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

//&per_page=12
