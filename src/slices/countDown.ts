import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentIndexSlice = createSlice({
	name: 'countDown',
	initialState: { seconds: 0, isCounting: false },
	reducers: {
		stopCountDown(state) {
			state.isCounting = false;
		},
		startCountDown(state, action: PayloadAction<number>) {
			return { seconds: action.payload, isCounting: true };
		},
		updateCountDownSeconds(state) {
			state.seconds = state.seconds - 1;
		},
	},
});

export const { startCountDown, stopCountDown, updateCountDownSeconds } =
	currentIndexSlice.actions;

export default currentIndexSlice.reducer;
