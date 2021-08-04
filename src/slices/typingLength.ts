import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'typingLength',
    initialState: 'sentences',
    reducers: {
        updateTypingLength(state, action) {
            return action.payload;
        },
    },
});

export const { updateTypingLength } = languageSlice.actions;
export default languageSlice.reducer;
