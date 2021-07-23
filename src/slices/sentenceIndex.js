import { createSlice } from '@reduxjs/toolkit';

const currentIndexSlice = createSlice({
    name: 'sentenceIndex',
    initialState: { current: 0, next: 1 },
    reducers: {
        updateIndex(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateCurrentIndex } = currentIndexSlice.actions;
export default currentIndexSlice.reducer;
