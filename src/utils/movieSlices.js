import { createSlice } from "@reduxjs/toolkit";

const moviesSlices = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload
        }
    }
});

export const { addNowPlayingMovies, addTrailerVideo } = moviesSlices.actions;

export default moviesSlices.reducer;