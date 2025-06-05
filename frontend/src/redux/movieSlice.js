import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    nowPlayingMovies: null,
    popularMovie:null
};
  

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovie:(state,action)=>{
            state.popularMovie = action.payload;
        },
    }
});

export const { getNowPlayingMovies, getPopularMovie } = movieSlice.actions;
export default movieSlice.reducer;
