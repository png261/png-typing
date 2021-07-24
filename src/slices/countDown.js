import { createSlice } from '@reduxjs/toolkit';

const currentIndexSlice = createSlice({
    name: 'countDown',
    initialState: { seconds: 0, isCounting: false },
    reducers: {
        stopCountDown(state, action) {
            state.isCounting = false;
        },
        startCountDown(state, action) {
            return { seconds: action.payload, isCounting: true };
        },
        updateCountDownSeconds(state, action) {
            state.seconds = state.seconds - 1;
        },
    },
});

export const { startCountDown, stopCountDown, updateCountDownSeconds } =
    currentIndexSlice.actions;
export default currentIndexSlice.reducer;
