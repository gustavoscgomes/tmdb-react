import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    region: "BR",
    language: "pt-BR",
    include_adult: false,
  },
});

export default api;