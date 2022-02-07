import { configureStore } from "@reduxjs/toolkit";
import dictReducer from "./dictSlide";
import wordModelReducer from "./wordModelSlide";

export default configureStore({
    reducer: {
        dict: dictReducer,
        wordModel: wordModelReducer,
    },
})