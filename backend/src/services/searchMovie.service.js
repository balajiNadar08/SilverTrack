import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export const searchMovie = async (query) => {
  if (!query) {
    throw new Error("Search query is required");
  }

  const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      include_adult: true,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
};
