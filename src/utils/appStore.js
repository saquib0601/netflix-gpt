import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import gptReducer from "./gptSlice";
import moviesReducer from "./movieSlices";
import userReducer from "./userSlice";

const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            movies: moviesReducer,
            gpt: gptReducer,
            config: configReducer,
        },
    }
);

export default appStore;