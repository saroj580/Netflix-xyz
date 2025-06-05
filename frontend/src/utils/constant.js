export const ApiEndPoints = "http://localhost:8000/api/v1/user";

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.TMDB_BEARER_TOKEN}`
  }
};

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const Now_Playing_Movie = import.meta.env.NOW_PLAYING_MOVIE;
export const Popular_Movie = import.meta.env.POPULAR_MOVIE;
export const Top_Rated_Movie = import.meta.env.TOP_RATED_MOVIE;
export const Upcoming_Movie = import.meta.env.UPCOMING_MOVIE;

export const  SEARCH_MOVIE_URL=import.meta.env.SEARCH_MOVIE_URL;

export const TMDB_IMG_URL = import.meta.env.TMDB_IMG_URL;