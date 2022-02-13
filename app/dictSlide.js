import { createSlice } from "@reduxjs/toolkit";

export const dictSlide = createSlice({
    name: 'dictionary',
    initialState: {
        words: []
    },
    reducers: {
        // add one word
        addWord: (state, action) => {
            state.words.push(action.payload)
        },

        // add many word
        addManyWord: (state, action) => {
            state.words.push(...action.payload)
        },

        // remove word by wordName
        removeWord: (state, action) => {
            state.words = state.words.filter(word => word.word != action.payload)
        }
    }
})

export const { addWord, addManyWord, removeWord } = dictSlide.actions

export default dictSlide.reducer