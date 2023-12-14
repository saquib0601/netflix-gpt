import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movieSlices";
import userReducer from "./userSlice";

const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            movies: moviesReducer,
        },
    }
);

export default appStore;