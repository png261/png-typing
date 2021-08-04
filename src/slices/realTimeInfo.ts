import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const realTimeInfo = createSlice({
	name: 'sentenceIndex',
	initialState: { cpm: 0, acc: 0 },
	reducers: {
		updateCPM(state, action: PayloadAction<number>) {
			state.cpm = action.payload;
		},
		updateACC(state, action: PayloadAction<number>) {
			state.acc = action.payload;
		},
		resetAllRealTimeInfo(): any {
			return {};
		},
	},
});

export const { updateCPM, updateACC, resetAllRealTimeInfo } =
	realTimeInfo.actions;
export default realTimeInfo.reducer;
