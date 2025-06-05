export const ApiEndPoints = "http://localhost:8000/api/v1/user";

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
  }
};
export const Now_Playing_Movie = process.env.Now_Playing_Movie;
export const Popular_Movie = process.env.Popular_Movie;
export const Top_Rated_Movie = process.env.Top_Rated_Movie;
export const Upcoming_Movie = process.env.Upcoming_Movie;

export const  SEARCH_MOVIE_URL=process.env.SEARCH_MOVIE_URL;

export const TMDB_IMG_URL = process.env.TMDB_IMG_URL;