import { createSlice } from '@reduxjs/toolkit';

const realTimeInfo = createSlice({
    name: 'sentenceIndex',
    initialState: { cpm: 0, acc: 0 },
    reducers: {
        updateCPM(state, action) {
            state.cpm = action.payload;
        },
        updateACC(state, action) {
            state.acc = action.payload;
        },
        resetAllRealTimeInfo() {
            return {};
        },
    },
});

export const { updateCPM, updateACC, resetAllRealTimeInfo } =
    realTimeInfo.actions;
export default realTimeInfo.reducer;
