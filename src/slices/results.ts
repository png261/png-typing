import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
	all: [],
	avg: [],
};

const results = createSlice({
	name: 'results',
	initialState,
	reducers: {
		addResult(state, action: PayloadAction<{}>) {
			state.all.push(action.payload);
		},
		addResultAvg(state, action: PayloadAction<{}>) {
			state.avg.push(action.payload);
		},
		resetResultAvg(state) {
			state.avg = [];
		},
	},
});

export const { addResult, addResultAvg, resetResultAvg } = results.actions;
export default results.reducer;
