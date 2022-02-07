import { configureStore } from "@reduxjs/toolkit";
import dictReducer from "./dictSlide";

export default configureStore({
    reducer: {
        dict: dictReducer,
    },
})