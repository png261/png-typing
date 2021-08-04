import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Results {
	all: { acc: number; cpm: number; wpm: number }[];
	avg: { acc: number; cpm: number; wpm: number }[];
}

const initialState: Results = {
	all: [],
	avg: [],
};

const results = createSlice({
	name: 'results',
	initialState,
	reducers: {
		addResult(
			state,
			action: PayloadAction<{ acc: number; cpm: number; wpm: number }>
		) {
			state.all.push(action.payload);
		},
		addResultAvg(
			state,
			action: PayloadAction<{ acc: number; cpm: number; wpm: number }>
		) {
			state.avg.push(action.payload);
		},
		resetResultAvg(state) {
			state.avg = [];
		},
	},
});

export const { addResult, addResultAvg, resetResultAvg } = results.actions;
export default results.reducer;
