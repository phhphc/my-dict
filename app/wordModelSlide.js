import { createSlice } from "@reduxjs/toolkit";

export const wordModelSlide = createSlice({
    name: "word=model",
    initialState: {
        show: false,
        wordName: "",
        wordMean: [],
    },
    reducers: {
        // show
        showWordModel: (state, { payload }) => {

            state.show = true
            state.wordName = payload.word
            state.wordMean = payload.mean
        },

        // hide
        hideWordModel: (state) => {
            state.show = false
        }
    }
})

export const { showWordModel, hideWordModel } = wordModelSlide.actions

export default wordModelSlide.reducer