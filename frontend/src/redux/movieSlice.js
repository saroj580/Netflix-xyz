import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    nowPlayingMovies: [],
    popularMovie: [],
    topRatedMovie: [],
    upcomingMovie: [],
    searchTerm: '',
    // searchResults: null,
    // loading: false,
    // error: null
};
  

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovies: (state, action) => {
            state.popularMovie = action.payload;
        },
        getTopRatedMovies: (state, action) => {
            state.topRatedMovie = action.payload;
        },
        getUpcomingMovies: (state, action) => {
            state.upcomingMovie = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    }
});

export const { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, setSearchTerm } = movieSlice.actions;
export default movieSlice.reducer;
