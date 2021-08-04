import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentIndexSlice {
	seconds: number;
	isCounting: boolean;
}

const initialState: CurrentIndexSlice = {
	seconds: 0,
	isCounting: false,
};

const currentIndexSlice = createSlice({
	name: 'countDown',
	initialState,
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
