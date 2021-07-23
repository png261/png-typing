import { createSlice } from '@reduxjs/toolkit';

const results = createSlice({
    name: 'results',
    initialState: [],
    reducers: {
        addResult(state, action) {
            state.push(action.payload);
        },
        removeAllResults() {
            return [];
        },
    },
});

export const { addResult, removeAllResults } = results.actions;
export default results.reducer;
