import { createSlice } from '@reduxjs/toolkit';

const results = createSlice({
    name: 'results',
    initialState: { all: [], avg: [] },
    reducers: {
        addResult(state, action) {
            state.all.push(action.payload);
        },
        addResultAvg(state, action) {
            state.avg.push(action.payload);
        },
        resetResultAvg(state, action) {
            state.avg = [];
        },
    },
});

export const { addResult, addResultAvg, resetResultAvg } = results.actions;
export default results.reducer;
