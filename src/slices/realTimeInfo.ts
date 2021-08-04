import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RealTimeInfo {
	cpm: number;
	acc: number;
}

const initialState: RealTimeInfo = {
	cpm: 0,
	acc: 0,
};

const realTimeInfo = createSlice({
	name: 'sentenceIndex',
	initialState,
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
