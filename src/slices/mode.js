import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
    name: 'mode',
    initialState: { mode: 'times', value: { times: 5, minutes: 1 } },
    reducers: {
        changeMode(state, action) {
            state.mode = action.payload;
        },
        updateModeValue(state, action) {
            state.value = { ...state.value, ...action.payload };
        },
    },
});

export const { changeMode, updateModeValue } = modeSlice.actions;
export default modeSlice.reducer;
